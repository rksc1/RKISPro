import { NextResponse, type NextRequest } from "next/server";
import { getVendorFromCookie } from "@/lib/auth";
import { getAdmins } from "@/services/admin-service";
import { createActivityLog, createNotification, createNotifications } from "@/services/notification-service";
import { getQuickBookingForRole, updateQuickBookingStatus } from "@/services/quick-booking-service";
import type { QuickBookingStatus } from "@/types/auth";

function isVendorStatus(value: string): value is Extract<QuickBookingStatus, "accepted" | "in_progress" | "completed"> {
  return value === "accepted" || value === "in_progress" || value === "completed";
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ bookingId: string }> }) {
  const vendor = await getVendorFromCookie();
  if (!vendor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookingId } = await params;
  const booking = await getQuickBookingForRole({ bookingId, role: "vendor", userId: vendor.id });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");
  if (!isVendorStatus(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const updated = await updateQuickBookingStatus({
    bookingId,
    vendorId: vendor.id,
    status,
    vendorNotes: String(formData.get("vendorNotes") ?? "").trim()
  });
  const admins = await getAdmins();

  await Promise.all([
    createNotification({
      userRole: "customer",
      userId: updated.customerId,
      title: status === "completed" ? "Service visit completed" : "Service visit updated",
      message: `${vendor.name} marked "${updated.title}" as ${status.replaceAll("_", " ")}.`,
      type: status === "completed" ? "success" : "info",
      link: `/customer/quick-bookings/${updated.id}`
    }),
    createNotifications(admins.map((admin) => ({
      userRole: "admin",
      userId: admin.id,
      title: "Vendor service visit update",
      message: `${vendor.name} marked "${updated.title}" as ${status.replaceAll("_", " ")}.`,
      type: status === "completed" ? "success" : "info",
      link: `/admin/quick-bookings/${updated.id}`
    }))),
    createActivityLog({
      actorRole: "vendor",
      actorId: vendor.id,
      entityType: "quick_booking",
      entityId: updated.id,
      action: status,
      description: `${vendor.name} updated service visit "${updated.title}".`
    })
  ]);

  return NextResponse.redirect(new URL("/vendor/quick-bookings", request.url), 303);
}
