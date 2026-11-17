import { notFound } from "next/navigation";
import { VendorLayout } from "@/components/layout/VendorLayout";
import { VendorMilestoneQCUpdate } from "@/components/ui/MilestoneQCInspector";
import { ProjectChat } from "@/components/ui/ProjectChat";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { getVendorFromCookie } from "@/lib/auth";
import { getProjectDetailForRole } from "@/services/project-service";
import { isApprovedVendor } from "@/services/vendor-service";

export const dynamic = "force-dynamic";

export default async function VendorProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, vendor] = await Promise.all([params, getVendorFromCookie()]);
  if (!vendor) notFound();
  if (!(await isApprovedVendor(vendor.id))) notFound();

  const project = await getProjectDetailForRole({ projectId: id, role: "vendor", userId: vendor.id });
  if (!project) notFound();

  return (
    <VendorLayout title="Project tracking">
      <div className="grid gap-6">
        <ProjectDetailContent
          project={project}
          role="vendor"
          milestoneControls={(milestone) => <VendorMilestoneQCUpdate projectId={project.id} milestone={milestone} />}
        />
        <ProjectChat projectId={project.id} currentUserId={vendor.id} />
      </div>
    </VendorLayout>
  );
}
