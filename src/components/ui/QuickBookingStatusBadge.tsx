import type { QuickBookingStatus } from "@/types/auth";

const styles: Record<QuickBookingStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  assigned: "bg-blue-50 text-blue-700 ring-blue-200",
  accepted: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  in_progress: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200"
};

export function QuickBookingStatusBadge({ status }: { status: QuickBookingStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ring-1 ${styles[status]}`}>{status.replaceAll("_", " ")}</span>;
}
