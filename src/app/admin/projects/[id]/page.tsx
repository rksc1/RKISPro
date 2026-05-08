import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { MilestoneForm } from "@/components/ui/MilestoneForm";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { ProjectUpdateForm } from "@/components/ui/ProjectUpdateForm";
import { getAdminFromCookie } from "@/lib/auth";
import type { ProjectMilestone } from "@/models/ProjectMilestone";
import { getProjectDetailForRole } from "@/services/project-service";

export const dynamic = "force-dynamic";

function AdminMilestoneControls({ projectId, milestone }: { projectId: string; milestone: ProjectMilestone }) {
  return (
    <div className="grid gap-3">
      <MilestoneForm action={`/api/admin/projects/${projectId}/milestones/${milestone.id}`} milestone={milestone} />
      <form action={`/api/admin/projects/${projectId}/milestones/${milestone.id}`} method="post">
        <input type="hidden" name="_method" value="delete" />
        <Button type="submit" variant="danger">Delete Milestone</Button>
      </form>
    </div>
  );
}

export default async function AdminProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, admin] = await Promise.all([params, getAdminFromCookie()]);
  if (!admin) notFound();

  const project = await getProjectDetailForRole({ projectId: id, role: "admin", userId: admin.id });
  if (!project) notFound();

  return (
    <AdminLayout title="Project execution">
      <div className="grid gap-5">
        <ProjectUpdateForm project={project} action={`/api/admin/projects/${project.id}`} />
        <MilestoneForm action={`/api/admin/projects/${project.id}/milestones`} />
        <ProjectDetailContent
          project={project}
          role="admin"
          milestoneControls={(milestone) => <AdminMilestoneControls projectId={project.id} milestone={milestone} />}
        />
      </div>
    </AdminLayout>
  );
}
