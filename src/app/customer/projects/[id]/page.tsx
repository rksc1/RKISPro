import { notFound } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { LeaveReviewForm } from "@/components/ui/LeaveReviewForm";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { RazorpayPaymentActions } from "@/components/ui/RazorpayPaymentActions";
import { getCustomerFromCookie } from "@/lib/auth";
import { getProjectFinanceForRole } from "@/services/finance-service";
import { getProjectDetailForRole } from "@/services/project-service";
import { getReviewForProject } from "@/services/review-service";

export const dynamic = "force-dynamic";

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
        <ProjectDetailContent project={project} role="customer" />
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
      </div>
    </CustomerLayout>
  );
}
