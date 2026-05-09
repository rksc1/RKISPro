import { NextResponse, type NextRequest } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import { getAdmins } from "@/services/admin-service";
import { getPaymentByRazorpayOrderId, markPaymentFailed, markPaymentPaid } from "@/services/finance-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import type { Json } from "@/types/supabase";

function getNestedString(value: unknown, path: string[]) {
  let current = value;
  for (const key of path) {
    if (!current || typeof current !== "object" || Array.isArray(current) || !(key in current)) return "";
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : "";
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!signature || !verifyRazorpayWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as Record<string, unknown>;
  const eventName = typeof event.event === "string" ? event.event : "";
  const paymentEntity = event.payload && typeof event.payload === "object"
    ? getNestedString(event, ["payload", "payment", "entity", "id"])
    : "";
  const orderId =
    getNestedString(event, ["payload", "payment", "entity", "order_id"]) ||
    getNestedString(event, ["payload", "order", "entity", "id"]);

  if (!orderId) return NextResponse.json({ received: true });

  const payment = await getPaymentByRazorpayOrderId(orderId);
  if (!payment) return NextResponse.json({ received: true });

  if (eventName === "payment.captured" || eventName === "order.paid") {
    const result = await markPaymentPaid({
      paymentId: payment.id,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentEntity || payment.razorpayPaymentId,
      razorpayStatus: "captured",
      gatewayResponse: event as Json
    });

    if (result.changed) {
      const admins = await getAdmins();
      await Promise.all([
        createNotifications(
          admins.map((admin) => ({
            userRole: "admin",
            userId: admin.id,
            title: "Razorpay webhook captured payment",
            message: `Online payment of Rs. ${Number(result.payment.amount).toLocaleString("en-IN")} was confirmed by Razorpay.`,
            type: "success",
            link: `/admin/projects/${result.payment.projectId}/finance`
          }))
        ),
        createActivityLog({
          actorRole: "admin",
          actorId: null,
          entityType: "project",
          entityId: result.payment.projectId,
          action: "razorpay_webhook_paid",
          description: "Razorpay webhook confirmed a captured payment.",
          metadata: { paymentId: payment.id, orderId, event: eventName }
        })
      ]);
    }
  }

  if (eventName === "payment.failed") {
    await markPaymentFailed({
      paymentId: payment.id,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentEntity || null,
      failureReason: getNestedString(event, ["payload", "payment", "entity", "error_description"]) || "Razorpay payment failed",
      gatewayResponse: event as Json
    });
  }

  return NextResponse.json({ received: true });
}
