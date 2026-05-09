import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { createPayment, getProjectFinanceForRole } from "@/services/finance-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import type { PaymentDirection, PaymentStatus, PaymentType } from "@/types/auth";

function isPaymentType(value: string): value is PaymentType {
  return value === "advance" || value === "milestone" || value === "final" || value === "refund" || value === "commission";
}

function isPaymentDirection(value: string): value is PaymentDirection {
  return value === "customer_to_platform" || value === "platform_to_vendor" || value === "customer_to_vendor";
}

function isPaymentStatus(value: string): value is PaymentStatus {
  return value === "pending" || value === "paid" || value === "failed" || value === "refunded";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;
  const finance = await getProjectFinanceForRole({ projectId, role: "admin", userId: admin.id });
  if (!finance) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const formData = await request.formData();
  const paymentType = String(formData.get("paymentType") ?? "");
  const paymentDirection = String(formData.get("paymentDirection") ?? "");
  const status = String(formData.get("status") ?? "pending");
  const amount = Number(formData.get("amount") ?? 0);

  if (!isPaymentType(paymentType) || !isPaymentDirection(paymentDirection) || !isPaymentStatus(status) || amount <= 0) {
    return NextResponse.json({ error: "Invalid payment details" }, { status: 400 });
  }

  const payment = await createPayment({
    projectId,
    paymentType,
    paymentDirection,
    status,
    amount,
    paymentMethod: String(formData.get("paymentMethod") ?? "").trim(),
    referenceNumber: String(formData.get("referenceNumber") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim(),
    createdByRole: "admin",
    createdById: admin.id
  });

  const notifications = [];
  if (payment.paymentType === "advance") {
    notifications.push({
      userRole: "customer" as const,
      userId: payment.customerId,
      title: "Advance recorded",
      message: `Advance payment of Rs. ${Number(payment.amount).toLocaleString("en-IN")} was recorded for your project.`,
      type: payment.status === "paid" ? ("success" as const) : ("info" as const),
      link: `/customer/projects/${projectId}/payments`
    });
  }
  if (payment.status === "paid" && payment.paymentDirection === "platform_to_vendor") {
    notifications.push({
      userRole: "vendor" as const,
      userId: payment.vendorId,
      title: "Payout completed",
      message: `Vendor payout of Rs. ${Number(payment.amount).toLocaleString("en-IN")} has been recorded.`,
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

  await Promise.all([
    createNotifications(notifications),
    createActivityLog({
      actorRole: "admin",
      actorId: admin.id,
      entityType: "project",
      entityId: projectId,
      action: "payment_created",
      description: `${admin.name} recorded a ${payment.paymentType} payment.`,
      metadata: { paymentId: payment.id, amount: payment.amount, status: payment.status }
    })
  ]);

  return NextResponse.redirect(new URL(`/admin/projects/${projectId}/finance`, request.url), 303);
}
