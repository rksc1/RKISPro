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
      className="rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        background: "rgba(14, 30, 39, 0.8)",
        border: "1px solid rgba(30, 52, 68, 0.8)",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="grid gap-4">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-white">
              {project.request?.projectTitle ?? "Project"}
            </h2>
            <p className="mt-1 text-sm text-navy-100/70">
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
              className="rounded-xl p-3"
              style={{
                background: "rgba(0,196,204,0.04)",
                border: "1px solid rgba(0,196,204,0.08)",
              }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-navy-100/50">
                {item.label}
              </span>
              <strong className="mt-1 block text-sm font-bold text-white">{item.value}</strong>
            </div>
          ))}
        </div>

        {/* Parties */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-1 rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          {project.vendor && (
            <span className="text-navy-100/70">
              <span className="font-semibold text-navy-100">Contractor:</span>{" "}
              {project.vendor.companyName}
            </span>
          )}
          {project.customer && (
            <span className="text-navy-100/70">
              <span className="font-semibold text-navy-100">Customer:</span>{" "}
              {project.customer.companyName}
            </span>
          )}
        </div>

        {footer}
      </div>
    </div>
  );
}
