import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Project } from "@/models/Project";

export function ProjectUpdateForm({ project, action }: { project: Project; action: string }) {
  return (
    <form className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-soft" action={action} method="post">
      <h3 className="text-lg font-black text-slate-950">Project controls</h3>
      <label className="grid gap-1.5 text-sm font-semibold text-ink">
        Project status
        <select className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand" name="status" defaultValue={project.status}>
          <option value="awarded">Awarded</option>
          <option value="in_progress">In progress</option>
          <option value="on_hold">On hold</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Expected delivery" name="expectedDeliveryDate" type="date" defaultValue={project.expectedDeliveryDate ?? ""} />
        <Input label="Actual delivery" name="actualDeliveryDate" type="date" defaultValue={project.actualDeliveryDate ?? ""} />
      </div>
      <Textarea label="Admin notes" name="adminNotes" rows={4} defaultValue={project.adminNotes ?? ""} />
      <Button type="submit">Update Project</Button>
    </form>
  );
}
