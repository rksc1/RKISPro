import { redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuickBookingCard } from "@/components/ui/QuickBookingCard";
import { getCustomerFromCookie } from "@/lib/auth";
import { getQuickBookingForRole } from "@/services/quick-booking-service";

export default async function CustomerQuickBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/auth?mode=login");

  const { id } = await params;
  const booking = await getQuickBookingForRole({ bookingId: id, role: "customer", userId: customer.id });
  if (!booking) redirect("/customer/quick-bookings");

  return (
    <CustomerLayout title="Service Visit Detail">
      <QuickBookingCard
        booking={booking}
        footer={booking.status === "pending" ? (
          <form action={`/api/customer/quick-bookings/${booking.id}/cancel`} method="post">
            <Button type="submit" variant="danger">Cancel Booking</Button>
          </form>
        ) : null}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-black text-slate-950">Visit Status Timeline</h2>
          <div className="mt-4 grid gap-3 text-sm">
            {["pending", "assigned", "accepted", "in_progress", "completed"].map((status) => (
              <div className={`rounded-md border p-3 ${booking.status === status ? "border-brand bg-amber-50" : "border-line"}`} key={status}>
                {status.replaceAll("_", " ")}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-black text-slate-950">Dispatch Assignment</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <span><strong>Vendor:</strong> {booking.vendor?.companyName ?? "Not assigned"}</span>
            <span><strong>Vendor phone:</strong> {booking.vendor?.phone ?? "Not assigned"}</span>
            <span><strong>Worker:</strong> {booking.assignedWorkerName ?? "Not assigned"}</span>
            <span><strong>Worker phone:</strong> {booking.assignedWorkerPhone ?? "Not assigned"}</span>
            <span><strong>Admin notes:</strong> {booking.adminNotes ?? "No notes"}</span>
          </div>
        </Card>
      </div>
      {booking.images.length > 0 ? (
        <Card>
          <h2 className="text-lg font-black text-slate-950">Uploaded Images</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {booking.images.map((image) => (
              <a className="rounded-md border border-line p-3 text-sm font-semibold text-brand" href={image} key={image} target="_blank">
                View image
              </a>
            ))}
          </div>
        </Card>
      ) : null}
    </CustomerLayout>
  );
}
