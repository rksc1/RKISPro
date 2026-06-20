import { notFound } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { LeaveReviewForm } from "@/components/ui/LeaveReviewForm";
import { ProjectChat } from "@/components/ui/ProjectChat";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { RazorpayPaymentActions } from "@/components/ui/RazorpayPaymentActions";
import { getCustomerFromCookie } from "@/lib/auth";
import type { ProjectMilestone } from "@/models/ProjectMilestone";
import { getProjectFinanceForRole } from "@/services/finance-service";
import { getProjectDetailForRole } from "@/services/project-service";
import { getReviewForProject } from "@/services/review-service";

export const dynamic = "force-dynamic";

function CustomerMilestoneControls({ projectId, milestone }: { projectId: string; milestone: ProjectMilestone }) {
  if (milestone.status !== "in_review") return null;
  return (
    <form className="flex items-center gap-4" action={`/api/customer/projects/${projectId}/milestones/${milestone.id}/approve`} method="post">
      <p className="text-sm text-slate-700">The vendor has submitted this milestone for your approval.</p>
      <Button type="submit">Approve Milestone</Button>
    </form>
  );
}

export default async function CustomerProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, customer] = await Promise.all([params, getCustomerFromCookie()]);
  if (!customer) notFound();

  const [project, finance, existingReview] = await Promise.all([
    getProjectDetailForRole({ projectId: id, role: "customer", userId: customer.id }),
    getProjectFinanceForRole({ projectId: id, role: "customer", userId: customer.id }),
    getReviewForProject(id)
  ]);

  if (!project || !finance) notFound();

  const failedPayments = finance.payments.filter((payment) => payment.status === "failed");

  return (
    <CustomerLayout title="Project tracking">
      <div className="grid gap-6">
        <ProjectDetailContent 
          project={project} 
          role="customer" 
          milestoneControls={(milestone) => <CustomerMilestoneControls projectId={project.id} milestone={milestone} />}
        />
        <RazorpayPaymentActions
          projectId={project.id}
          pendingBalance={Number(finance.financial.pendingCustomerBalance)}
          customer={{ name: customer.name, email: customer.email }}
          failedPayments={failedPayments}
        />
        {project.status === "completed" && !existingReview && (
          <LeaveReviewForm projectId={project.id} />
        )}
        {existingReview && (
          <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <h3 className="text-lg font-black text-slate-950">Your Review</h3>
            <div className="mt-3 flex gap-1 text-xl text-amber-500">
              {Array.from({ length: existingReview.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            {existingReview.comment && (
              <p className="mt-2 text-sm text-slate-700">&quot;{existingReview.comment}&quot;</p>
            )}
          </div>
        )}
        <ProjectChat projectId={project.id} currentUserId={customer.id} />
      </div>
    </CustomerLayout>
  );
}
