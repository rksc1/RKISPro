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
        <div className="grid gap-2 text-sm md:grid-cols-5">
          <span><strong>Vendor:</strong> {project.vendor?.companyName ?? "Vendor"}</span>
          <span><strong>Customer:</strong> {project.customer?.companyName ?? "Customer"}</span>
          <span><strong>Value:</strong> ₹{Number(project.projectValue).toLocaleString("en-IN")}</span>
          <span><strong>Expected:</strong> {project.expectedDeliveryDate ?? "Not set"}</span>
          <span><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        {footer}
      </div>
    </Card>
  );
}
