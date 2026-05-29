import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuickBookingCard } from "@/components/ui/QuickBookingCard";
import { getAdminFromCookie } from "@/lib/auth";
import {
  formatQuickBookingServiceType,
  getAdminQuickBookings,
  quickBookingServiceGroups,
  quickBookingServiceTypes,
  quickBookingStatuses,
  quickBookingUrgencies
} from "@/services/quick-booking-service";
import type { QuickBookingServiceType, QuickBookingStatus, QuickBookingUrgency } from "@/types/auth";

export const dynamic = "force-dynamic";

export default async function AdminQuickBookingsPage({
  searchParams
}: {
  searchParams: Promise<{ status?: QuickBookingStatus | ""; serviceType?: QuickBookingServiceType | ""; urgency?: QuickBookingUrgency | ""; location?: string; assignment?: "assigned" | "unassigned" | "" }>;
}) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/auth?mode=login");

  const filters = await searchParams;
  const bookings = await getAdminQuickBookings(filters);

  return (
    <AdminLayout title="Service Visit Dispatch Queue">
      <Card>
        <form className="grid gap-4 md:grid-cols-6" method="get">
          <label className="grid gap-2 text-sm font-semibold">
            Status
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="status" defaultValue={filters.status ?? ""}>
              <option value="">All</option>
              {quickBookingStatuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Service
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="serviceType" defaultValue={filters.serviceType ?? ""}>
              <option value="">All</option>
              {quickBookingServiceGroups.map((group) => (
                <optgroup label={group.label} key={group.label}>
                  {group.options.map((type) => <option key={type} value={type}>{formatQuickBookingServiceType(type)}</option>)}
                </optgroup>
              ))}
              <optgroup label="Legacy">
                {quickBookingServiceTypes.slice(0, 8).map((type) => <option key={type} value={type}>{formatQuickBookingServiceType(type)}</option>)}
              </optgroup>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Urgency
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="urgency" defaultValue={filters.urgency ?? ""}>
              <option value="">All</option>
              {quickBookingUrgencies.map((urgency) => <option key={urgency} value={urgency}>{urgency}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Location
            <input className="min-h-11 rounded-md border border-line px-3" name="location" defaultValue={filters.location ?? ""} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Assignment
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="assignment" defaultValue={filters.assignment ?? ""}>
              <option value="">All</option>
              <option value="unassigned">Unassigned</option>
              <option value="assigned">Assigned</option>
            </select>
          </label>
          <div className="flex items-end gap-2">
            <Button type="submit">Filter</Button>
            <Button href="/admin/quick-bookings" variant="secondary">Reset</Button>
          </div>
        </form>
      </Card>
      {bookings.length === 0 ? (
        <EmptyState title="No quick service requests in this queue" description="Customer service visit requests will appear here for review, assignment, dispatch, follow up, and completion." />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <QuickBookingCard key={booking.id} booking={booking} href={`/admin/quick-bookings/${booking.id}`} />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
