import { VendorLayout } from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getVendorFromCookie } from "@/lib/auth";
import { getVendorProjects } from "@/services/project-service";
import { isApprovedVendor } from "@/services/vendor-service";

export const dynamic = "force-dynamic";

export default async function VendorProjectsPage() {
  const vendor = await getVendorFromCookie();
  const isApproved = vendor ? await isApprovedVendor(vendor.id) : false;
  const projects = vendor && isApproved ? await getVendorProjects(vendor.id) : [];

  return (
    <VendorLayout title="Execution tracking">
      {!isApproved ? (
        <EmptyState title="Approval required" description="Project access unlocks after vendor approval and category verification." />
      ) : projects.length === 0 ? (
        <EmptyState title="No assigned projects yet" description="Awarded work from selected quotations will appear here with milestones, payment visibility, and execution notes." />
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              footer={
                <div className="flex flex-wrap gap-2">
                  <Button href={`/vendor/projects/${project.id}`} variant="secondary">View Tracking</Button>
                  <Button href={`/vendor/projects/${project.id}/payments`} variant="secondary">Payments</Button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </VendorLayout>
  );
}
