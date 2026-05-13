import { notFound } from "next/navigation";
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/Button";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { getVendorFromCookie } from "@/lib/auth";
import type { ProjectMilestone } from "@/models/ProjectMilestone";
import { getProjectDetailForRole } from "@/services/project-service";
import { isApprovedVendor } from "@/services/vendor-service";

export const dynamic = "force-dynamic";

function VendorMilestoneControls({ projectId, milestone }: { projectId: string; milestone: ProjectMilestone }) {
  return (
    <form className="flex flex-wrap gap-2" action={`/api/vendor/projects/${projectId}/milestones/${milestone.id}`} method="post">
      <label className="grid gap-1.5 text-sm font-semibold text-ink">
        Progress status
        <select className="min-h-10 rounded-md border border-line bg-white px-3 text-sm font-normal" name="status" defaultValue={milestone.status}>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
          <option value="delayed">Delayed</option>
        </select>
      </label>
      <label className="grid min-w-64 flex-1 gap-1.5 text-sm font-semibold text-ink">
        Progress note
        <input className="min-h-10 rounded-md border border-line bg-white px-3 text-sm font-normal" name="progressNote" placeholder="Optional progress note" />
      </label>
      <div className="flex items-end">
        <Button type="submit">Update Milestone</Button>
      </div>
    </form>
  );
}

export default async function VendorProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, vendor] = await Promise.all([params, getVendorFromCookie()]);
  if (!vendor) notFound();
  if (!(await isApprovedVendor(vendor.id))) notFound();

  const project = await getProjectDetailForRole({ projectId: id, role: "vendor", userId: vendor.id });
  if (!project) notFound();

  return (
    <VendorLayout title="Project tracking">
      <ProjectDetailContent
        project={project}
        role="vendor"
        milestoneControls={(milestone) => <VendorMilestoneControls projectId={project.id} milestone={milestone} />}
      />
    </VendorLayout>
  );
}
