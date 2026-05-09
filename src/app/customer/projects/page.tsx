import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getCustomerFromCookie } from "@/lib/auth";
import { getCustomerProjects } from "@/services/project-service";

export const dynamic = "force-dynamic";

export default async function CustomerProjectsPage() {
  const customer = await getCustomerFromCookie();
  const projects = customer ? await getCustomerProjects(customer.id) : [];

  return (
    <CustomerLayout title="My projects">
      {projects.length === 0 ? (
        <EmptyState title="No awarded projects yet" description="Selected vendors and awarded RFQs will appear here." />
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              footer={
                <div className="flex flex-wrap gap-2">
                  <Button href={`/customer/projects/${project.id}`} variant="secondary">View Tracking</Button>
                  <Button href={`/customer/projects/${project.id}/payments`} variant="secondary">Payments</Button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </CustomerLayout>
  );
}
