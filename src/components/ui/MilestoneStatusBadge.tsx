import type { MilestoneStatus } from "@/types/auth";

const classes: Record<MilestoneStatus, string> = {
  pending: "bg-slate-200 text-slate-700",
  in_progress: "bg-amber-100 text-amber-800",
  in_review: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
  delayed: "bg-red-100 text-red-800",
  cancelled: "bg-slate-300 text-slate-800"
};

export function MilestoneStatusBadge({ status }: { status: MilestoneStatus }) {
  return <span className={`w-max rounded-full px-2.5 py-1 text-xs font-bold ${classes[status]}`}>{status.replace("_", " ")}</span>;
}
