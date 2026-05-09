import { NextResponse, type NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { getAdmins } from "@/services/admin-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import { getQuickBookingForRole, updateQuickBookingStatus } from "@/services/quick-booking-service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ bookingId: string }> }) {
  const customer = await getCustomerFromCookie();
  if (!customer) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookingId } = await params;
  const booking = await getQuickBookingForRole({ bookingId, role: "customer", userId: customer.id });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  if (booking.status !== "pending") return NextResponse.json({ error: "Only pending bookings can be cancelled" }, { status: 400 });

  const updated = await updateQuickBookingStatus({ bookingId, status: "cancelled" });
  const admins = await getAdmins();
  await Promise.all([
    createNotifications(admins.map((admin) => ({
      userRole: "admin",
      userId: admin.id,
      title: "Quick booking cancelled",
      message: `${customer.name} cancelled "${updated.title}".`,
      type: "warning",
      link: `/admin/quick-bookings/${updated.id}`
    }))),
    createActivityLog({
      actorRole: "customer",
      actorId: customer.id,
      entityType: "quick_booking",
      entityId: updated.id,
      action: "cancelled",
      description: `${customer.name} cancelled quick booking "${updated.title}".`
    })
  ]);

  return NextResponse.redirect(new URL(`/customer/quick-bookings/${bookingId}`, request.url), 303);
}
