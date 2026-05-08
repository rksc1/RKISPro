import { ProjectStatusBadge } from "@/components/ui/ProjectStatusBadge";
import type { ProjectStatus } from "@/types/auth";

export function ProjectDetailHeader({
  title,
  serviceType,
  location,
  status
}: {
  title: string;
  serviceType?: string;
  location?: string;
  status: ProjectStatus;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-line bg-white p-5 shadow-soft">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-gold">Project Tracking</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-muted">{serviceType ?? "Industrial service"} | {location ?? "Location not set"}</p>
      </div>
      <ProjectStatusBadge status={status} />
    </div>
  );
}
