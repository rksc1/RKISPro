import { notFound } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { getCustomerFromCookie } from "@/lib/auth";
import { getProjectDetailForRole } from "@/services/project-service";

export const dynamic = "force-dynamic";

export default async function CustomerProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, customer] = await Promise.all([params, getCustomerFromCookie()]);
  if (!customer) notFound();

  const project = await getProjectDetailForRole({ projectId: id, role: "customer", userId: customer.id });
  if (!project) notFound();

  return (
    <CustomerLayout title="Project tracking">
      <ProjectDetailContent project={project} role="customer" />
    </CustomerLayout>
  );
}
