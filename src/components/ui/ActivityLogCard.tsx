import type { ActivityLog } from "@/models/ActivityLog";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function ActivityLogCard({ log }: { log: ActivityLog }) {
  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-canvas px-2 py-1 text-xs font-bold uppercase text-brand-dark">{log.actorRole}</span>
        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold uppercase text-blue-700">{log.entityType}</span>
        <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-bold uppercase text-amber-700">{log.action}</span>
      </div>
      <p className="mt-3 font-semibold text-brand-dark">{log.description ?? "Activity recorded"}</p>
      <p className="mt-2 text-xs font-semibold text-muted">{formatDate(log.createdAt)}</p>
    </article>
  );
}
