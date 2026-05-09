import type { QuickBookingUrgency } from "@/types/auth";

const styles: Record<QuickBookingUrgency, string> = {
  normal: "bg-slate-50 text-slate-700 ring-slate-200",
  urgent: "bg-amber-50 text-amber-700 ring-amber-200",
  emergency: "bg-red-50 text-red-700 ring-red-200"
};

export function UrgencyBadge({ urgency }: { urgency: QuickBookingUrgency }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ring-1 ${styles[urgency]}`}>{urgency}</span>;
}
