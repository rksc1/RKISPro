import { NextResponse, type NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { createRazorpayOrder } from "@/lib/razorpay";
import {
  createPayment,
  getPendingRazorpayPayment,
  getProjectFinanceForRole,
  markPaymentFailed,
  updatePaymentRazorpayOrder
} from "@/services/finance-service";
import type { PaymentType } from "@/types/auth";

function isCustomerPaymentType(value: string): value is Extract<PaymentType, "advance" | "milestone" | "final"> {
  return value === "advance" || value === "milestone" || value === "final";
}

export async function POST(request: NextRequest) {
  const customer = await getCustomerFromCookie();
  if (!customer) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as {
    project_id?: string;
    payment_type?: string;
    amount?: number;
  } | null;

  const projectId = String(body?.project_id ?? "");
  const paymentType = String(body?.payment_type ?? "");
  const amount = Number(body?.amount ?? 0);

  if (!projectId || !isCustomerPaymentType(paymentType) || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid payment request" }, { status: 400 });
  }

  const finance = await getProjectFinanceForRole({ projectId, role: "customer", userId: customer.id });
  if (!finance) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  if (finance.project.status === "cancelled") {
    return NextResponse.json({ error: "Cancelled projects cannot accept payments" }, { status: 400 });
  }
  if (amount > Number(finance.financial.pendingCustomerBalance)) {
    return NextResponse.json({ error: "Amount exceeds pending customer balance" }, { status: 400 });
  }

  const activePending = await getPendingRazorpayPayment({ customerId: customer.id, projectId, paymentType });
  if (activePending?.razorpayOrderId) {
    return NextResponse.json({
      order_id: activePending.razorpayOrderId,
      amount: activePending.amount,
      currency: "INR",
      payment_id: activePending.id,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      customer: {
        name: customer.name,
        email: customer.email
      }
    });
  }

  const payment = await createPayment({
    projectId,
    paymentType,
    paymentDirection: "customer_to_platform",
    amount,
    status: "pending",
    paymentMethod: "razorpay",
    notes: `Online ${paymentType} payment initiated by customer`,
    createdByRole: "customer",
    createdById: customer.id
  });

  try {
    const order = await createRazorpayOrder(amount, payment.id, {
      payment_id: payment.id,
      project_id: projectId,
      customer_id: customer.id,
      payment_type: paymentType
    });
    await updatePaymentRazorpayOrder({
      paymentId: payment.id,
      projectId,
      razorpayOrderId: order.id,
      gatewayResponse: order
    });

    return NextResponse.json({
      order_id: order.id,
      amount,
      currency: order.currency ?? "INR",
      payment_id: payment.id,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      customer: {
        name: customer.name,
        email: customer.email
      }
    });
  } catch (error) {
    await markPaymentFailed({
      paymentId: payment.id,
      failureReason: error instanceof Error ? error.message : "Razorpay order creation failed"
    });
    return NextResponse.json({ error: "Unable to create Razorpay order" }, { status: 502 });
  }
}
