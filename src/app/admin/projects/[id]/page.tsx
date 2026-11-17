import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MilestoneForm } from "@/components/ui/MilestoneForm";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { ProjectUpdateForm } from "@/components/ui/ProjectUpdateForm";
import { VendorPayoutForm } from "@/components/ui/VendorPayoutForm";
import { getAdminFromCookie } from "@/lib/auth";
import type { ProjectMilestone } from "@/models/ProjectMilestone";
import { getProjectFinanceForRole } from "@/services/finance-service";
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

  const [project, financeData] = await Promise.all([
    getProjectDetailForRole({ projectId: id, role: "admin", userId: admin.id }),
    getProjectFinanceForRole({ projectId: id, role: "admin", userId: admin.id })
  ]);

  if (!project || !financeData) notFound();

  const { financial } = financeData;

  return (
    <AdminLayout title="Project execution">
      <div className="grid gap-5">
        
        {project.status === "awarded" && (
          <Card className="border-2 border-brand bg-brand/5">
            <h2 className="text-xl font-bold text-ink">Escrow Clearance Gate (Locked)</h2>
            <p className="text-sm text-muted mt-2">
              The bid is accepted but execution is paused. Awaiting the Customer&apos;s mobilization advance to clear in the RKISPro Nodal Account.
            </p>
            
            <div className="mt-4 grid gap-4 border-t border-line pt-4 md:grid-cols-3">
              <div className="rounded-lg border border-line/50 p-4 bg-surface">
                <span className="text-xs font-semibold uppercase text-muted">Step 1</span>
                <h3 className="mt-1 font-bold text-ink">Vendor PI</h3>
                <p className="text-sm text-muted mb-3">Has the vendor uploaded the PI?</p>
                {project.proformaInvoiceUrl ? (
                  <a 
                    href={project.proformaInvoiceUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-secondary w-full inline-flex justify-center"
                  >
                    View PI PDF
                  </a>
                ) : (
                  <Button variant="secondary" className="w-full" disabled>Not Uploaded Yet</Button>
                )}
              </div>
              
              <div className="rounded-lg border border-line/50 p-4 bg-surface">
                <span className="text-xs font-semibold uppercase text-muted">Step 2</span>
                <h3 className="mt-1 font-bold text-ink">Escrow Received</h3>
                <p className="text-sm text-muted mb-3">
                  Commission: ${project.commissionAmount?.toLocaleString() || 0}
                </p>
                <form action={`/api/admin/projects/${project.id}/unlock`} method="post">
                  <Button type="submit" className="w-full">Mark Funds Cleared</Button>
                </form>
              </div>

              <div className="rounded-lg border border-line/50 p-4 bg-surface">
                <span className="text-xs font-semibold uppercase text-muted">Step 3</span>
                <h3 className="mt-1 font-bold text-ink">Vendor Payout</h3>
                <p className="text-sm text-muted mb-3">Wire net advance to vendor.</p>
                <Button variant="secondary" className="w-full">Log Transfer</Button>
              </div>
            </div>
          </Card>
        )}

        <ProjectUpdateForm project={project} action={`/api/admin/projects/${project.id}`} />
        
        {project.vendorId && Number(financial.pendingVendorPayout) > 0 && (
          <VendorPayoutForm 
            projectId={project.id} 
            vendorId={project.vendorId} 
            pendingPayout={Number(financial.pendingVendorPayout)} 
          />
        )}

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
