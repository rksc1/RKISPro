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
    <VendorLayout title="Assigned Quick Bookings">
      {bookings.length === 0 ? (
        <EmptyState title="No quick bookings assigned" description="Admin-assigned small service jobs will appear here." />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <QuickBookingCard
              key={booking.id}
              booking={booking}
              footer={
                <form action={`/api/vendor/quick-bookings/${booking.id}`} className="grid gap-3 border-t border-line pt-4 md:grid-cols-[1fr_1fr_auto]" method="post">
                  <select className="min-h-10 rounded-md border border-line bg-white px-3 text-sm" name="status" defaultValue={booking.status}>
                    <option value="accepted">Accepted</option>
                    <option value="in_progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <input className="min-h-10 rounded-md border border-line px-3 text-sm" name="vendorNotes" placeholder="Progress notes" defaultValue={booking.vendorNotes ?? ""} />
                  <Button type="submit">Update</Button>
                </form>
              }
            />
          ))}
        </div>
      )}
    </VendorLayout>
  );
}
