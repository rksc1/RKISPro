import { VendorLayout } from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getVendorFromCookie } from "@/lib/auth";
import { getVendorProjects } from "@/services/project-service";

export const dynamic = "force-dynamic";

export default async function VendorProjectsPage() {
  const vendor = await getVendorFromCookie();
  const projects = vendor ? await getVendorProjects(vendor.id) : [];

  return (
    <VendorLayout title="My projects">
      {projects.length === 0 ? (
        <EmptyState title="No assigned projects yet" description="Awarded projects from selected quotations will appear here." />
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
