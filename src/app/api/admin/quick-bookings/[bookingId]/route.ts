import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { createActivityLog, createNotification } from "@/services/notification-service";
import { getQuickBookingForRole, quickBookingStatuses, updateQuickBookingAssignment } from "@/services/quick-booking-service";
import { getVendorById } from "@/services/vendor-service";
import type { QuickBookingStatus } from "@/types/auth";

function isStatus(value: string): value is QuickBookingStatus {
  return quickBookingStatuses.includes(value as QuickBookingStatus);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ bookingId: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookingId } = await params;
  const existing = await getQuickBookingForRole({ bookingId, role: "admin", userId: admin.id });
  if (!existing) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");
  if (!isStatus(status)) return NextResponse.json({ error: "Invalid booking status" }, { status: 400 });

  const assignedVendorId = String(formData.get("assignedVendorId") ?? "").trim();
  const vendor = assignedVendorId ? await getVendorById(assignedVendorId) : null;
  if (assignedVendorId && vendor?.status !== "Approved") {
    return NextResponse.json({ error: "Only approved vendors can be assigned" }, { status: 400 });
  }

  const updated = await updateQuickBookingAssignment({
    bookingId,
    status,
    assignedVendorId: assignedVendorId || null,
    assignedWorkerName: String(formData.get("assignedWorkerName") ?? "").trim(),
    assignedWorkerPhone: String(formData.get("assignedWorkerPhone") ?? "").trim(),
    adminNotes: String(formData.get("adminNotes") ?? "").trim()
  });

  const notifications = [
    createNotification({
      userRole: "customer",
      userId: updated.customerId,
      title: "Quick booking updated",
      message: vendor
        ? `${vendor.companyName} has been assigned to "${updated.title}".`
        : `Your quick booking "${updated.title}" was updated by RKISPro.`,
      type: status === "cancelled" ? "warning" : "success",
      link: `/customer/quick-bookings/${updated.id}`
    })
  ];
  if (updated.assignedVendorId) {
    notifications.push(createNotification({
      userRole: "vendor",
      userId: updated.assignedVendorId,
      title: "Quick booking assigned",
      message: `RKISPro assigned you quick booking "${updated.title}".`,
      type: "info",
      link: "/vendor/quick-bookings"
    }));
  }

  await Promise.all([
    ...notifications,
    createActivityLog({
      actorRole: "admin",
      actorId: admin.id,
      entityType: "quick_booking",
      entityId: updated.id,
      action: "updated",
      description: `${admin.name} updated quick booking "${updated.title}".`,
      metadata: { status, assignedVendorId: updated.assignedVendorId }
    })
  ]);

  return NextResponse.redirect(new URL(`/admin/quick-bookings/${bookingId}`, request.url), 303);
}
