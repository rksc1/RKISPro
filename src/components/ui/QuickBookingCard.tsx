import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuickBookingStatusBadge } from "@/components/ui/QuickBookingStatusBadge";
import { UrgencyBadge } from "@/components/ui/UrgencyBadge";
import { WhatsAppQuickAction } from "@/components/ui/WhatsAppQuickAction";
import type { QuickBooking } from "@/models/QuickBooking";
import { formatQuickBookingServiceType } from "@/services/quick-booking-service";
import { Calendar, Clock, MapPin, UserCheck, Wrench } from "lucide-react";
import type { ReactNode } from "react";

export function QuickBookingCard({
  booking,
  href,
  footer,
  viewerRole = "customer"
}: {
  booking: QuickBooking & {
    customer?: { name: string; companyName: string; phone: string; email: string } | null;
    vendor?: { companyName: string; ownerName: string; phone: string; location: string } | null;
  };
  href?: string;
  footer?: ReactNode;
  viewerRole?: "customer" | "vendor" | "admin";
}) {
  const targetWorkerPhone = booking.assignedWorkerPhone || booking.vendor?.phone;
  const targetWorkerName = booking.assignedWorkerName || booking.vendor?.ownerName || booking.vendor?.companyName;

  const targetCustomerPhone = booking.contactPhone || booking.customer?.phone;
  const targetCustomerName = booking.contactName || booking.customer?.name || booking.customer?.companyName;

  return (
    <Card className="transition hover:border-teal-500/40 hover:shadow-sm">
      <div className="grid gap-4">
        {/* Top Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700">
              <Wrench className="size-3.5" />
              <span>Service Visit #{booking.id.slice(0, 8)}</span>
            </div>
            <h2 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">{booking.title}</h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
              <MapPin className="size-3.5 text-teal-600" />
              <span>{formatQuickBookingServiceType(booking.serviceType)} · {booking.location}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <UrgencyBadge urgency={booking.urgency} />
            <QuickBookingStatusBadge status={booking.status} />
          </div>
        </div>

        {/* Schedule & Budget Matrix */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50/70 p-3 text-xs sm:grid-cols-4">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
              <span className="font-semibold text-slate-800">{booking.preferredDate ?? "Flexible"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Slot</span>
              <span className="font-semibold text-slate-800">{booking.preferredTime ?? "Flexible"}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Indicative Budget</span>
            <span className="font-bold text-slate-900">
              {booking.budget ? `₹${Number(booking.budget).toLocaleString("en-IN")}` : "Diagnostic Quote"}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Photos / Snaps</span>
            <span className="font-semibold text-slate-800">{booking.images?.length || 0} File(s)</span>
          </div>
        </div>

        {/* Direct WhatsApp / Phone Dispatch Communication Bar */}
        {viewerRole === "customer" && targetWorkerPhone && (
          <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50/50 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="size-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  Assigned Technician: {targetWorkerName}
                </span>
                <span className="text-[11px] text-emerald-800">
                  {booking.vendor?.companyName ? `Via ${booking.vendor.companyName}` : "Dispatched via RKISPro"}
                </span>
              </div>
            </div>
            <WhatsAppQuickAction
              phone={targetWorkerPhone}
              recipientName={targetWorkerName}
              bookingTitle={booking.title}
              bookingId={booking.id}
              location={booking.location}
              role="customer"
              size="sm"
            />
          </div>
        )}

        {viewerRole === "vendor" && targetCustomerPhone && (
          <div className="flex flex-col gap-2 rounded-xl border border-teal-500/30 bg-teal-50/50 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="size-4 text-teal-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-teal-950 block">
                  Plant / Site Contact: {targetCustomerName}
                </span>
                <span className="text-[11px] text-teal-800">
                  Site Entry Coordination
                </span>
              </div>
            </div>
            <WhatsAppQuickAction
              phone={targetCustomerPhone}
              recipientName={targetCustomerName}
              bookingTitle={booking.title}
              bookingId={booking.id}
              location={booking.location}
              role="vendor"
              size="sm"
            />
          </div>
        )}

        {/* Access Notes */}
        {(booking.siteAccessNotes || booking.safetyRequirements || booking.machineOrEquipment) && (
          <div className="grid gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-xs text-slate-600 sm:grid-cols-2">
            {booking.machineOrEquipment && (
              <span><strong>Machine / Model:</strong> {booking.machineOrEquipment}</span>
            )}
            {booking.siteAccessNotes && (
              <span><strong>Gate Access:</strong> {booking.siteAccessNotes}</span>
            )}
            {booking.safetyRequirements && (
              <span className="sm:col-span-2"><strong>Safety & PPE:</strong> {booking.safetyRequirements}</span>
            )}
          </div>
        )}

        {booking.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
            {booking.description}
          </p>
        )}

        {/* Footer actions */}
        {footer ?? (href ? (
          <div className="flex justify-end pt-2 border-t border-slate-100">
            <Button href={href} variant="secondary" className="text-xs">
              View Visit Details
            </Button>
          </div>
        ) : null)}
      </div>
    </Card>
  );
}
