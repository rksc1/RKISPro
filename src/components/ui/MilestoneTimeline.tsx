/* eslint-disable @next/next/no-img-element */
import { EmptyState } from "@/components/ui/EmptyState";
import { MilestoneStatusBadge } from "@/components/ui/MilestoneStatusBadge";
import type { ProjectMilestone } from "@/models/ProjectMilestone";
import { Download, FileText, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

function isPdf(url: string) {
  return url.toLowerCase().includes(".pdf") || url.toLowerCase().includes("application/pdf");
}

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
      {milestones.map((milestone) => {
        const isCompleted = milestone.status === "completed";

        return (
          <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md" key={milestone.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-950 text-base sm:text-lg">{milestone.title}</h3>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="size-3 text-emerald-600" />
                      Inspection Passed
                    </span>
                  )}
                </div>
                {milestone.description && (
                  <p className="mt-1 text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                    {milestone.description}
                  </p>
                )}
              </div>
              <MilestoneStatusBadge status={milestone.status} />
            </div>

            <div className="mt-4 grid gap-2 text-xs font-medium text-slate-500 sm:grid-cols-3 border-t border-slate-100 pt-3">
              <span><strong>Target Due Date:</strong> {milestone.dueDate ?? "Not set"}</span>
              <span><strong>Sign-Off Date:</strong> {milestone.completedAt ? new Date(milestone.completedAt).toLocaleDateString() : "Pending"}</span>
              <span><strong>Logged By:</strong> {milestone.createdByRole.toUpperCase()}</span>
            </div>

            {/* Proof of Work Attachments */}
            {milestone.attachmentUrls && milestone.attachmentUrls.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-4">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Inspection Deliverables & Proof of Work ({milestone.attachmentUrls.length})
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {milestone.attachmentUrls.map((url, i) => {
                    const pdf = isPdf(url);
                    if (pdf) {
                      return (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 hover:border-teal-500 hover:bg-white shadow-3xs transition"
                        >
                          <FileText className="size-4 text-red-500 shrink-0" />
                          <span className="max-w-[140px] truncate">Inspection Certificate {i + 1}.pdf</span>
                          <Download className="size-3 text-slate-400 ml-1" />
                        </a>
                      );
                    }

                    return (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative size-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-3xs"
                      >
                        <img
                          src={url}
                          alt={`Proof Attachment ${i + 1}`}
                          className="size-full object-cover transition duration-300 group-hover:scale-110"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {controls ? <div className="mt-4 border-t border-slate-100 pt-4">{controls(milestone)}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
