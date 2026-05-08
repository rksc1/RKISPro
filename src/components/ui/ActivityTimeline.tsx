import type { ActivityLog } from "@/models/ActivityLog";
import { ActivityLogCard } from "@/components/ui/ActivityLogCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function ActivityTimeline({ logs }: { logs: ActivityLog[] }) {
  if (logs.length === 0) {
    return <EmptyState title="No activity recorded" description="Major RFQ, quote, vendor, and project actions will appear here." />;
  }

  return (
    <div className="relative grid gap-3 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line">
      {logs.map((log) => (
        <div className="relative pl-10" key={log.id}>
          <span className="absolute left-2 top-5 h-4 w-4 rounded-full border-2 border-brand-gold bg-white" />
          <ActivityLogCard log={log} />
        </div>
      ))}
    </div>
  );
}
