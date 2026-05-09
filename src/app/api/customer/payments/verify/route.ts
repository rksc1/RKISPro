import { NextResponse, type NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { getAdmins } from "@/services/admin-service";
import { getPaymentForCustomer, markPaymentFailed, markPaymentPaid } from "@/services/finance-service";
import { createActivityLog, createNotification, createNotifications } from "@/services/notification-service";

export async function POST(request: NextRequest) {
  const customer = await getCustomerFromCookie();
  if (!customer) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as {
    payment_id?: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  } | null;

  const paymentId = String(body?.payment_id ?? "");
  const orderId = String(body?.razorpay_order_id ?? "");
  const razorpayPaymentId = String(body?.razorpay_payment_id ?? "");
  const signature = String(body?.razorpay_signature ?? "");

  if (!paymentId || !orderId || !razorpayPaymentId || !signature) {
    return NextResponse.json({ error: "Missing Razorpay verification fields" }, { status: 400 });
  }

  const payment = await getPaymentForCustomer({ paymentId, customerId: customer.id });
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  if (payment.razorpayOrderId !== orderId) return NextResponse.json({ error: "Razorpay order mismatch" }, { status: 400 });
  if (payment.status === "paid") {
    const sameGatewayPayment = !payment.razorpayPaymentId || payment.razorpayPaymentId === razorpayPaymentId;
    return NextResponse.json({ success: true, idempotent: true, alreadyPaid: sameGatewayPayment });
  }
  if (payment.status !== "pending") return NextResponse.json({ error: "Payment is not pending" }, { status: 400 });

  const valid = verifyRazorpaySignature(orderId, razorpayPaymentId, signature);
  if (!valid) {
    await markPaymentFailed({
      paymentId,
      razorpayOrderId: orderId,
      razorpayPaymentId,
      failureReason: "Invalid Razorpay signature",
      gatewayResponse: { source: "checkout_verify" }
    });
    await createNotification({
      userRole: "customer",
      userId: customer.id,
      title: "Payment verification failed",
      message: "We could not verify your Razorpay payment. Please contact RKISPro support if money was debited.",
      type: "error",
      link: `/customer/projects/${payment.projectId}/payments`
    });
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  const result = await markPaymentPaid({
    paymentId,
    razorpayOrderId: orderId,
    razorpayPaymentId,
    razorpaySignature: signature,
    razorpayStatus: "captured",
    gatewayResponse: { source: "checkout_verify", razorpay_payment_id: razorpayPaymentId }
  });

  if (result.changed) {
    const admins = await getAdmins();
    await Promise.all([
      createNotification({
        userRole: "customer",
        userId: customer.id,
        title: "Payment successful",
        message: `Your ${result.payment.paymentType} payment of Rs. ${Number(result.payment.amount).toLocaleString("en-IN")} was received.`,
        type: "success",
        link: `/customer/projects/${result.payment.projectId}/payments`
      }),
      createNotifications(
        admins.map((admin) => ({
          userRole: "admin",
          userId: admin.id,
          title: "Razorpay payment received",
          message: `${customer.name} paid Rs. ${Number(result.payment.amount).toLocaleString("en-IN")} online.`,
          type: "success",
          link: `/admin/projects/${result.payment.projectId}/finance`
        }))
      ),
      createActivityLog({
        actorRole: "customer",
        actorId: customer.id,
        entityType: "project",
        entityId: result.payment.projectId,
        action: "razorpay_payment_paid",
        description: `${customer.name} completed a Razorpay payment.`,
        metadata: { paymentId, razorpayPaymentId, amount: result.payment.amount }
      })
    ]);
  }

  return NextResponse.json({ success: true });
}
