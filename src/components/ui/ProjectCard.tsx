import { Card } from "@/components/ui/Card";
import { ProjectStatusBadge } from "@/components/ui/ProjectStatusBadge";
import type { Project } from "@/models/Project";
import type { ReactNode } from "react";

export function ProjectCard({
  project,
  footer
}: {
  project: Project & {
    vendor?: { companyName: string; ownerName: string; location: string } | null;
    customer?: { name: string; companyName: string; location: string } | null;
    request?: { projectTitle: string; serviceType: string; location: string } | null;
  };
  footer?: ReactNode;
}) {
  const expectedDate = project.expectedDeliveryDate ?? "Not set";
  const createdDate = new Date(project.createdAt).toLocaleDateString();

  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-950">{project.request?.projectTitle ?? "Project"}</h2>
            <p className="mt-1 text-sm text-muted">
              {project.request?.serviceType} | {project.request?.location}
            </p>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-canvas p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Project value</span>
            <strong className="mt-1 block text-slate-950">INR {Number(project.projectValue).toLocaleString("en-IN")}</strong>
          </div>
          <div className="rounded-lg border border-line bg-canvas p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Expected delivery</span>
            <strong className="mt-1 block text-slate-950">{expectedDate}</strong>
          </div>
          <div className="rounded-lg border border-line bg-canvas p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Tracking opened</span>
            <strong className="mt-1 block text-slate-950">{createdDate}</strong>
          </div>
        </div>
        <div className="grid gap-2 text-sm md:grid-cols-2">
          <span><strong>Vendor:</strong> {project.vendor?.companyName ?? "Vendor"}</span>
          <span><strong>Customer:</strong> {project.customer?.companyName ?? "Customer"}</span>
        </div>
        {footer}
      </div>
    </Card>
  );
}
