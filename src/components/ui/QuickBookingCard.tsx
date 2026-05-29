import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuickBookingStatusBadge } from "@/components/ui/QuickBookingStatusBadge";
import { UrgencyBadge } from "@/components/ui/UrgencyBadge";
import type { QuickBooking } from "@/models/QuickBooking";
import { formatQuickBookingServiceType } from "@/services/quick-booking-service";
import type { ReactNode } from "react";

export function QuickBookingCard({
  booking,
  href,
  footer
}: {
  booking: QuickBooking & {
    customer?: { name: string; companyName: string; phone: string; email: string } | null;
    vendor?: { companyName: string; ownerName: string; phone: string; location: string } | null;
  };
  href?: string;
  footer?: ReactNode;
}) {
  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">Service Visit</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">{booking.title}</h2>
            <p className="mt-1 text-sm text-muted">{formatQuickBookingServiceType(booking.serviceType)} | {booking.location}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <UrgencyBadge urgency={booking.urgency} />
            <QuickBookingStatusBadge status={booking.status} />
          </div>
        </div>
        <div className="grid gap-2 text-sm md:grid-cols-4">
          <span><strong>Date:</strong> {booking.preferredDate ?? "Flexible"}</span>
          <span><strong>Time:</strong> {booking.preferredTime ?? "Flexible"}</span>
          <span><strong>Budget:</strong> {booking.budget ? `Rs. ${Number(booking.budget).toLocaleString("en-IN")}` : "Not set"}</span>
          <span><strong>Images:</strong> {booking.images.length}</span>
        </div>
        <div className="grid gap-1 text-sm text-muted">
          <span><strong>Assigned technician / vendor:</strong> {booking.vendor?.companyName ?? "Not assigned"}</span>
          <span><strong>Assigned worker:</strong> {booking.assignedWorkerName ?? "Not assigned"} {booking.assignedWorkerPhone ? `(${booking.assignedWorkerPhone})` : ""}</span>
          <span><strong>Site contact:</strong> {[booking.contactName, booking.contactPhone].filter(Boolean).join(" - ") || "Account contact"}</span>
          <span><strong>Machine / equipment:</strong> {booking.machineOrEquipment ?? "Not specified"}</span>
        </div>
        {booking.siteAccessNotes || booking.safetyRequirements ? (
          <div className="grid gap-2 rounded-lg border border-line bg-canvas p-3 text-sm text-muted md:grid-cols-2">
            <span><strong>Site access:</strong> {booking.siteAccessNotes ?? "Not specified"}</span>
            <span><strong>Safety:</strong> {booking.safetyRequirements ?? "Not specified"}</span>
          </div>
        ) : null}
        <p className="line-clamp-2 text-sm text-muted">{booking.description ?? "No description provided."}</p>
        {footer ?? (href ? <Button href={href} variant="secondary">Open</Button> : null)}
      </div>
    </Card>
  );
}
