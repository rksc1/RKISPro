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
          {milestone.attachmentUrls && milestone.attachmentUrls.length > 0 && (
            <div className="mt-4 border-t border-line pt-4">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">Proof of Work Attachments</span>
              <div className="flex flex-wrap gap-2">
                {milestone.attachmentUrls.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="block h-16 w-16 overflow-hidden rounded-md border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Attachment ${i + 1}`} className="h-full w-full object-cover transition-transform hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          )}
          {controls ? <div className="mt-4 border-t border-line pt-4">{controls(milestone)}</div> : null}
        </div>
      ))}
    </div>
  );
}
