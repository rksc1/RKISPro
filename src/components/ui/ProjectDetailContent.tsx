import { MilestoneTimeline } from "@/components/ui/MilestoneTimeline";
import { ProjectDetailHeader } from "@/components/ui/ProjectDetailHeader";
import { ProjectInfoCard } from "@/components/ui/ProjectInfoCard";
import type { getProjectDetailForRole } from "@/services/project-service";

type ProjectDetail = NonNullable<Awaited<ReturnType<typeof getProjectDetailForRole>>>;

export function ProjectDetailContent({
  project,
  role,
  milestoneControls
}: {
  project: ProjectDetail;
  role: "customer" | "vendor" | "admin";
  milestoneControls?: Parameters<typeof MilestoneTimeline>[0]["controls"];
}) {
  return (
    <div className="grid gap-5">
      <ProjectDetailHeader
        title={project.request?.projectTitle ?? "Project"}
        serviceType={project.request?.serviceType}
        location={project.request?.location}
        status={project.status}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <ProjectInfoCard
          title="Project Summary"
          items={[
            { label: "Project value", value: `₹${Number(project.projectValue).toLocaleString("en-IN")}` },
            ...(role === "admin" ? [{ label: "Commission", value: `₹${Number(project.commissionAmount).toLocaleString("en-IN")}` }] : []),
            { label: "Expected delivery", value: project.expectedDeliveryDate },
            { label: "Actual delivery", value: project.actualDeliveryDate },
            { label: "Admin notes", value: project.adminNotes }
          ]}
        />
        <ProjectInfoCard
          title="Customer"
          items={[
            { label: "Company", value: project.customer?.companyName },
            { label: "Contact", value: project.customer?.name },
            { label: "Location", value: project.customer?.location }
          ]}
        />
        <ProjectInfoCard
          title="Vendor"
          items={[
            { label: "Company", value: project.vendor?.companyName },
            { label: "Owner", value: project.vendor?.ownerName },
            { label: "Location", value: project.vendor?.location }
          ]}
        />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <ProjectInfoCard
          title="RFQ Details"
          items={[
            { label: "Title", value: project.request?.projectTitle },
            { label: "Service", value: project.request?.serviceType },
            { label: "Location", value: project.request?.location }
          ]}
        />
        <ProjectInfoCard
          title="Selected Quote"
          items={[
            { label: "Amount", value: project.quote ? `₹${Number(project.quote.amount).toLocaleString("en-IN")}` : null },
            { label: "Timeline", value: project.quote?.timeline },
            { label: "Notes", value: project.quote?.notes },
            { label: "Attachment", value: project.quote?.attachmentUrl ? "Available" : "Not attached" }
          ]}
        />
      </div>
      <div>
        <h2 className="mb-4 text-xl font-black text-slate-950">Milestone Timeline</h2>
        <MilestoneTimeline milestones={project.milestones} controls={milestoneControls} />
      </div>
    </div>
  );
}
