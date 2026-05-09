import { redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuickBookingCard } from "@/components/ui/QuickBookingCard";
import { getCustomerFromCookie } from "@/lib/auth";
import { getCustomerQuickBookings } from "@/services/quick-booking-service";

export const dynamic = "force-dynamic";

export default async function CustomerQuickBookingsPage() {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/customer/login");

  const bookings = await getCustomerQuickBookings(customer.id);

  return (
    <CustomerLayout title="My Quick Bookings">
      <div className="flex justify-end">
        <Button href="/customer/quick-booking/new">Book Now</Button>
      </div>
      {bookings.length === 0 ? (
        <EmptyState title="No quick bookings yet" description="Small urgent service jobs will appear here after booking." />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <QuickBookingCard key={booking.id} booking={booking} href={`/customer/quick-bookings/${booking.id}`} />
          ))}
        </div>
      )}
    </CustomerLayout>
  );
}
