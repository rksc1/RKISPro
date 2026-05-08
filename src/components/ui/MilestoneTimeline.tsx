import { EmptyState } from "@/components/ui/EmptyState";
import { MilestoneStatusBadge } from "@/components/ui/MilestoneStatusBadge";
import type { ProjectMilestone } from "@/models/ProjectMilestone";
import type { ReactNode } from "react";

export function MilestoneTimeline({
  milestones,
  controls
}: {
  milestones: ProjectMilestone[];
  controls?: (milestone: ProjectMilestone) => ReactNode;
}) {
  if (milestones.length === 0) {
    return <EmptyState title="No milestones yet" description="Milestones will appear here once project execution is planned." />;
  }

  return (
    <div className="grid gap-4">
      {milestones.map((milestone) => (
        <div className="relative rounded-lg border border-line bg-white p-5 shadow-soft" key={milestone.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-950">{milestone.title}</h3>
              <p className="mt-1 text-sm text-muted">{milestone.description || "No description"}</p>
            </div>
            <MilestoneStatusBadge status={milestone.status} />
          </div>
          <div className="mt-4 grid gap-2 text-sm text-muted md:grid-cols-3">
            <span>Due: {milestone.dueDate ?? "Not set"}</span>
            <span>Completed: {milestone.completedAt ? new Date(milestone.completedAt).toLocaleDateString() : "Not completed"}</span>
            <span>Created by: {milestone.createdByRole}</span>
          </div>
          {controls ? <div className="mt-4 border-t border-line pt-4">{controls(milestone)}</div> : null}
        </div>
      ))}
    </div>
  );
}
