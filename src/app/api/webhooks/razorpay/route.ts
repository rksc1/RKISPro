import { NextResponse, type NextRequest } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import { getPaymentByRazorpayOrderId, markPaymentFailed, markPaymentPaid } from "@/services/finance-service";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  try {
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Webhook signature verification error:", error);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 500 });
  }

  const body = JSON.parse(rawBody);
  const event = body.event;

  try {
    if (event === "payment.captured") {
      const entity = body.payload.payment.entity;
      const orderId = entity.order_id;
      const paymentId = entity.notes?.payment_id;

      if (!orderId) {
        return NextResponse.json({ received: true });
      }

      let payment = null;
      if (paymentId) {
        // Try getting by notes.payment_id first (more reliable if provided)
        // We'd have to import getPaymentForCustomer but we don't have customer context here.
        // But getPaymentByRazorpayOrderId is easier.
      }
      
      payment = await getPaymentByRazorpayOrderId(orderId);

      if (payment && payment.status !== "paid") {
        await markPaymentPaid({
          paymentId: payment.id,
          razorpayOrderId: orderId,
          razorpayPaymentId: entity.id,
          razorpayStatus: entity.status,
          gatewayResponse: body
        });
      }
    } else if (event === "payment.failed") {
      const entity = body.payload.payment.entity;
      const orderId = entity.order_id;
      
      if (!orderId) return NextResponse.json({ received: true });

      const payment = await getPaymentByRazorpayOrderId(orderId);

      if (payment && payment.status !== "paid") {
        await markPaymentFailed({
          paymentId: payment.id,
          razorpayOrderId: orderId,
          razorpayPaymentId: entity.id,
          failureReason: entity.error_description || entity.error_reason || "Payment failed",
          gatewayResponse: body
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // Still return 200 so Razorpay stops retrying unless it's a critical DB failure,
    // but in this case let's return 500 so it retries if DB is down.
    return NextResponse.json({ error: "Internal processing error" }, { status: 500 });
  }
}
