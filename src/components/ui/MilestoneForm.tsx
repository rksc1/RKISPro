import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ProjectMilestone } from "@/models/ProjectMilestone";

export function MilestoneForm({
  action,
  milestone
}: {
  action: string;
  milestone?: ProjectMilestone;
}) {
  return (
    <form className="grid gap-4 rounded-lg border border-line bg-canvas p-4" action={action} method="post">
      {milestone ? <input type="hidden" name="milestoneId" value={milestone.id} /> : null}
      <Input label="Milestone title" name="title" defaultValue={milestone?.title ?? ""} required />
      <Textarea label="Description" name="description" rows={3} defaultValue={milestone?.description ?? ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Due date" name="dueDate" type="date" defaultValue={milestone?.dueDate ?? ""} />
        {milestone ? (
          <label className="grid gap-1.5 text-sm font-semibold text-ink">
            Status
            <select className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand" name="status" defaultValue={milestone.status}>
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="delayed">Delayed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        ) : null}
      </div>
      <Button type="submit">{milestone ? "Update Milestone" : "Create Milestone"}</Button>
    </form>
  );
}
