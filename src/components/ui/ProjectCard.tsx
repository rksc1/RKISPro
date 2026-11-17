import { ProjectStatusBadge } from "@/components/ui/ProjectStatusBadge";
import type { Project } from "@/models/Project";
import type { ReactNode } from "react";

export function ProjectCard({
  project,
  footer,
}: {
  project: Project & {
    vendor?: { companyName: string; ownerName: string; location: string } | null;
    customer?: { name: string; companyName: string; location: string } | null;
    request?: { projectTitle: string; serviceType: string; location: string } | null;
  };
  footer?: ReactNode;
}) {
  const expectedDate = project.expectedDeliveryDate ?? "Not set";
  const createdDate = new Date(project.createdAt).toLocaleDateString("en-IN");

  const metaItems = [
    { label: "Project Value", value: `₹${Number(project.projectValue).toLocaleString("en-IN")}` },
    { label: "Expected Delivery", value: expectedDate },
    { label: "Tracking Opened", value: createdDate },
  ];

  return (
    <div
      className="rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 bg-white border border-slate-200/90 shadow-sm"
    >
      <div className="grid gap-4">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              {project.request?.projectTitle ?? "Project"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {project.request?.serviceType}
              {project.request?.location && ` · ${project.request.location}`}
            </p>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>

        {/* Meta grid */}
        <div className="grid gap-3 md:grid-cols-3">
          {metaItems.map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-3 bg-slate-50 border border-slate-200"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {item.label}
              </span>
              <strong className="mt-1 block text-sm font-bold text-slate-900">{item.value}</strong>
            </div>
          ))}
        </div>

        {/* Parties */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-1 rounded-xl px-4 py-3 text-sm bg-slate-50 border border-slate-200"
        >
          {project.vendor && (
            <span className="text-slate-600">
              <span className="font-semibold text-slate-900">Contractor:</span>{" "}
              {project.vendor.companyName}
            </span>
          )}
          {project.customer && (
            <span className="text-slate-600">
              <span className="font-semibold text-slate-900">Customer:</span>{" "}
              {project.customer.companyName}
            </span>
          )}
        </div>

        {footer}
      </div>
    </div>
  );
}
