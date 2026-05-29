import { redirect } from "next/navigation";
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuickBookingCard } from "@/components/ui/QuickBookingCard";
import { getVendorFromCookie } from "@/lib/auth";
import { getVendorQuickBookings } from "@/services/quick-booking-service";

export const dynamic = "force-dynamic";

export default async function VendorQuickBookingsPage() {
  const vendor = await getVendorFromCookie();
  if (!vendor) redirect("/auth?mode=login");

  const bookings = await getVendorQuickBookings(vendor.id);

  return (
    <VendorLayout title="Assigned Service Visits">
      {bookings.length === 0 ? (
        <EmptyState title="No assigned service visits yet" description="Admin-assigned service visits for urgent repairs, breakdowns, installation support, and small field jobs will appear here." />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <QuickBookingCard
              key={booking.id}
              booking={booking}
              footer={
                <form action={`/api/vendor/quick-bookings/${booking.id}`} className="grid gap-3 border-t border-line pt-4 md:grid-cols-[1fr_1fr_auto]" method="post">
                  <select className="min-h-10 rounded-md border border-line bg-white px-3 text-sm" name="status" defaultValue={booking.status}>
                    <option value="accepted">Accept visit</option>
                    <option value="in_progress">Start work</option>
                    <option value="completed">Mark completed</option>
                  </select>
                  <input className="min-h-10 rounded-md border border-line px-3 text-sm" name="vendorNotes" placeholder="Service visit note" defaultValue={booking.vendorNotes ?? ""} />
                  <Button type="submit">Update Visit</Button>
                </form>
              }
            />
          ))}
        </div>
      )}
    </VendorLayout>
  );
}
