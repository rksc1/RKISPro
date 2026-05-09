import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { getProjectFinanceForRole, recalculateProjectFinancial, updatePaymentStatus } from "@/services/finance-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import type { PaymentStatus } from "@/types/auth";

function isPaymentStatus(value: string): value is PaymentStatus {
  return value === "pending" || value === "paid" || value === "failed" || value === "refunded";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; paymentId: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId, paymentId } = await params;
  const financeBefore = await getProjectFinanceForRole({ projectId, role: "admin", userId: admin.id });
  if (!financeBefore) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  const existingPayment = financeBefore.payments.find((payment) => payment.id === paymentId);
  if (!existingPayment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");
  if (!isPaymentStatus(status)) return NextResponse.json({ error: "Invalid payment status" }, { status: 400 });
  if (existingPayment.paymentMethod === "razorpay" && existingPayment.status === "paid" && status !== "paid") {
    return NextResponse.json({ error: "Paid Razorpay payments are locked" }, { status: 400 });
  }

  const payment = await updatePaymentStatus({
    projectId,
    paymentId,
    status,
    paymentMethod: String(formData.get("paymentMethod") ?? "").trim(),
    referenceNumber: String(formData.get("referenceNumber") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim()
  });
  const financial = await recalculateProjectFinancial(projectId);

  const notifications = [];
  if (payment.status === "paid" && payment.paymentDirection === "platform_to_vendor") {
    notifications.push({
      userRole: "vendor" as const,
      userId: payment.vendorId,
      title: "Payout completed",
      message: `Payout of Rs. ${Number(payment.amount).toLocaleString("en-IN")} has been marked paid.`,
      type: "success" as const,
      link: `/vendor/projects/${projectId}/payments`
    });
  }
  if (payment.status === "paid" && payment.paymentDirection !== "platform_to_vendor") {
    notifications.push({
      userRole: "customer" as const,
      userId: payment.customerId,
      title: "Payment completed",
      message: `Payment of Rs. ${Number(payment.amount).toLocaleString("en-IN")} has been marked paid.`,
      type: "success" as const,
      link: `/customer/projects/${projectId}/payments`
    });
  }
  if (financial.pendingCustomerBalance > 0) {
    notifications.push({
      userRole: "customer" as const,
      userId: payment.customerId,
      title: "Balance pending",
      message: `Pending balance is Rs. ${Number(financial.pendingCustomerBalance).toLocaleString("en-IN")}.`,
      type: "warning" as const,
      link: `/customer/projects/${projectId}/payments`
    });
  }

  await Promise.all([
    createNotifications(notifications),
    createActivityLog({
      actorRole: "admin",
      actorId: admin.id,
      entityType: "project",
      entityId: projectId,
      action: "payment_updated",
      description: `${admin.name} updated payment status to ${payment.status}.`,
      metadata: { paymentId: payment.id, amount: payment.amount }
    })
  ]);

  return NextResponse.redirect(new URL(`/admin/projects/${projectId}/finance`, request.url), 303);
}
