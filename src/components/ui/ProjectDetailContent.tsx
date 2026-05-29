import { MilestoneTimeline } from "@/components/ui/MilestoneTimeline";
import { ProjectDetailHeader } from "@/components/ui/ProjectDetailHeader";
import { ProjectInfoCard } from "@/components/ui/ProjectInfoCard";
import type { getProjectDetailForRole } from "@/services/project-service";

type ProjectDetail = NonNullable<Awaited<ReturnType<typeof getProjectDetailForRole>>>;

function formatMoney(value: number | string | null | undefined) {
  return value == null ? null : `INR ${Number(value).toLocaleString("en-IN")}`;
}

export function ProjectDetailContent({
  project,
  role,
  milestoneControls
}: {
  project: ProjectDetail;
  role: "customer" | "vendor" | "admin";
  milestoneControls?: Parameters<typeof MilestoneTimeline>[0]["controls"];
}) {
  const completedMilestones = project.milestones.filter((milestone) => milestone.status === "completed").length;
  const delayedMilestones = project.milestones.filter((milestone) => milestone.status === "delayed").length;

  return (
    <div className="grid gap-5">
      <ProjectDetailHeader
        title={project.request?.projectTitle ?? "Project"}
        serviceType={project.request?.serviceType}
        location={project.request?.location}
        status={project.status}
      />
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
          <span className="text-xs font-bold uppercase tracking-wide text-muted">Project value</span>
          <strong className="mt-1 block text-lg text-slate-950">{formatMoney(project.projectValue)}</strong>
        </div>
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
          <span className="text-xs font-bold uppercase tracking-wide text-muted">Expected delivery</span>
          <strong className="mt-1 block text-lg text-slate-950">{project.expectedDeliveryDate ?? "Not set"}</strong>
        </div>
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
          <span className="text-xs font-bold uppercase tracking-wide text-muted">Milestones</span>
          <strong className="mt-1 block text-lg text-slate-950">{completedMilestones}/{project.milestones.length} complete</strong>
        </div>
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
          <span className="text-xs font-bold uppercase tracking-wide text-muted">Risk watch</span>
          <strong className="mt-1 block text-lg text-slate-950">{delayedMilestones ? `${delayedMilestones} delayed` : "No delays logged"}</strong>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <ProjectInfoCard
          title="Execution Summary"
          items={[
            { label: "Project value", value: formatMoney(project.projectValue) },
            ...(role === "admin" ? [{ label: "Commission", value: formatMoney(project.commissionAmount) }] : []),
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
          title="Requirement Scope"
          items={[
            { label: "Title", value: project.request?.projectTitle },
            { label: "Service", value: project.request?.serviceType },
            { label: "Location", value: project.request?.location }
          ]}
        />
        <ProjectInfoCard
          title="Selected Quote"
          items={[
            { label: "Amount", value: project.quote ? formatMoney(project.quote.amount) : null },
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
