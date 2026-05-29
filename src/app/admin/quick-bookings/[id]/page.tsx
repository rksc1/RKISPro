import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AssignmentPanel } from "@/components/ui/AssignmentPanel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuickBookingCard } from "@/components/ui/QuickBookingCard";
import { getAdminFromCookie } from "@/lib/auth";
import { formatQuickBookingServiceType, getQuickBookingForRole } from "@/services/quick-booking-service";
import { getQuickBookingAssignableVendors } from "@/services/vendor-service";

export default async function AdminQuickBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/auth?mode=login");

  const { id } = await params;
  const [booking, vendors] = await Promise.all([
    getQuickBookingForRole({ bookingId: id, role: "admin", userId: admin.id }),
    getQuickBookingAssignableVendors({})
  ]);
  if (!booking) redirect("/admin/quick-bookings");
  const filteredVendors = await getQuickBookingAssignableVendors({
    serviceType: booking.serviceType,
    location: booking.location
  });

  return (
    <AdminLayout title="Service Visit Dispatch">
      <div className="flex justify-end">
        <Button href="/admin/quick-bookings" variant="secondary">Back</Button>
      </div>
      <QuickBookingCard booking={booking} />
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h2 className="text-lg font-black text-slate-950">Customer / Site Details</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <span><strong>Name:</strong> {booking.customer?.name}</span>
            <span><strong>Company:</strong> {booking.customer?.companyName}</span>
            <span><strong>Email:</strong> {booking.customer?.email}</span>
            <span><strong>Phone:</strong> {booking.customer?.phone}</span>
            <span><strong>Site contact:</strong> {[booking.contactName, booking.contactPhone].filter(Boolean).join(" - ") || "Account contact"}</span>
            <span><strong>Site access:</strong> {booking.siteAccessNotes ?? "Not specified"}</span>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-black text-slate-950">Assignment / Dispatch</h2>
          <div className="mt-4">
            <AssignmentPanel booking={booking} vendors={filteredVendors.length > 0 ? filteredVendors : vendors} />
          </div>
        </Card>
      </div>
      <Card>
        <h2 className="text-lg font-black text-slate-950">Service Visit Review</h2>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          <span><strong>Service:</strong> {formatQuickBookingServiceType(booking.serviceType)}</span>
          <span><strong>Urgency:</strong> {booking.urgency}</span>
          <span><strong>Preferred date/time:</strong> {[booking.preferredDate, booking.preferredTime].filter(Boolean).join(" ") || "Flexible"}</span>
          <span><strong>Budget:</strong> {booking.budget ? `Rs. ${Number(booking.budget).toLocaleString("en-IN")}` : "Not set"}</span>
          <span><strong>Machine / equipment:</strong> {booking.machineOrEquipment ?? "Not specified"}</span>
          <span><strong>Issue started:</strong> {booking.issueStartedAt ?? "Not specified"}</span>
          <span className="md:col-span-2"><strong>Safety requirements:</strong> {booking.safetyRequirements ?? "Not specified"}</span>
        </div>
      </Card>
      {booking.images.length > 0 ? (
        <Card>
          <h2 className="text-lg font-black text-slate-950">Images</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {booking.images.map((image) => (
              <a className="rounded-md border border-line p-3 text-sm font-semibold text-brand" href={image} key={image} target="_blank">
                View image
              </a>
            ))}
          </div>
        </Card>
      ) : null}
    </AdminLayout>
  );
}
