import { notFound } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { LeaveReviewForm } from "@/components/ui/LeaveReviewForm";
import { CustomerMilestoneQCReview } from "@/components/ui/MilestoneQCInspector";
import { ProjectChat } from "@/components/ui/ProjectChat";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { RazorpayPaymentActions } from "@/components/ui/RazorpayPaymentActions";
import { getCustomerFromCookie } from "@/lib/auth";
import { getProjectFinanceForRole } from "@/services/finance-service";
import { getProjectDetailForRole } from "@/services/project-service";
import { getReviewForProject } from "@/services/review-service";
import { FileText } from "lucide-react";

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
        <ProjectDetailContent 
          project={project} 
          role="customer" 
          milestoneControls={(milestone) => <CustomerMilestoneQCReview projectId={project.id} milestone={milestone} />}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Project Financials & Tax Invoices</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Pending Balance: ₹{Number(finance.financial.pendingCustomerBalance).toLocaleString("en-IN")} · Cleared in Escrow: ₹{Number(finance.financial.totalReceived).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href={`/customer/projects/${project.id}/invoice`} variant="secondary" className="text-xs gap-1.5">
              <FileText className="size-3.5" />
              <span>GST Tax Invoice</span>
            </Button>
            <Button href={`/customer/projects/${project.id}/payments`} variant="secondary" className="text-xs">
              Payment Ledger
            </Button>
          </div>
        </div>

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
