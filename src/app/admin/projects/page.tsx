import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Textarea } from "@/components/ui/Textarea";
import { getAdminProjects } from "@/services/project-service";
import type { ProjectStatus } from "@/types/auth";

export const dynamic = "force-dynamic";

function isProjectStatus(value?: string): value is ProjectStatus {
  return value === "awarded" || value === "in_progress" || value === "on_hold" || value === "completed" || value === "cancelled";
}

export default async function AdminProjectsPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const filters = await searchParams;
  const status = isProjectStatus(filters.status) ? filters.status : "";
  const projects = await getAdminProjects(status);

  return (
    <AdminLayout title="Projects">
      <Card>
        <form className="grid gap-4 md:grid-cols-[1fr_auto]" action="/admin/projects">
          <label className="grid gap-1.5 text-sm font-semibold text-ink" htmlFor="status">
            Status
            <select
              className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand"
              defaultValue={status}
              id="status"
              name="status"
            >
              <option value="">All</option>
              <option value="awarded">Awarded</option>
              <option value="in_progress">In progress</option>
              <option value="on_hold">On hold</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <div className="flex items-end">
            <Button type="submit">Filter</Button>
          </div>
        </form>
      </Card>
      {projects.length === 0 ? (
        <EmptyState title="No projects found" description="Awarded projects will appear here for admin operations." />
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              footer={
                <div className="grid gap-4 border-t border-line pt-4">
                  <Button href={`/admin/projects/${project.id}`} variant="secondary">Open Tracking</Button>
                <form className="grid gap-4" action={`/api/admin/projects/${project.id}`} method="post">
                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="grid gap-1.5 text-sm font-semibold text-ink">
                      Status
                      <select
                        className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand"
                        defaultValue={project.status}
                        name="status"
                      >
                        <option value="awarded">Awarded</option>
                        <option value="in_progress">In progress</option>
                        <option value="on_hold">On hold</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </label>
                    <Input label="Expected delivery" name="expectedDeliveryDate" type="date" defaultValue={project.expectedDeliveryDate ?? ""} />
                    <Input label="Actual delivery" name="actualDeliveryDate" type="date" defaultValue={project.actualDeliveryDate ?? ""} />
                  </div>
                  <Textarea label="Admin notes" name="adminNotes" rows={3} defaultValue={project.adminNotes ?? ""} />
                  <Button type="submit">Update Project</Button>
                </form>
                </div>
              }
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
