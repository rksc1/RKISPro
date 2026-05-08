import type { ProjectStatus } from "@/types/auth";

const classes: Record<ProjectStatus, string> = {
  awarded: "bg-blue-100 text-blue-800",
  in_progress: "bg-amber-100 text-amber-800",
  on_hold: "bg-slate-200 text-slate-700",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800"
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`w-max rounded-full px-2.5 py-1 text-xs font-bold ${classes[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}
