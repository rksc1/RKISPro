import { redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FinancialSummaryCard } from "@/components/ui/FinancialSummaryCard";
import { PaymentCard } from "@/components/ui/PaymentCard";
import { RazorpayPaymentActions } from "@/components/ui/RazorpayPaymentActions";
import { getCustomerFromCookie } from "@/lib/auth";
import { getProjectFinanceForRole } from "@/services/finance-service";

export default async function CustomerProjectPaymentsPage({ params }: { params: Promise<{ id: string }> }) {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/auth?mode=login");

  const { id } = await params;
  const finance = await getProjectFinanceForRole({ projectId: id, role: "customer", userId: customer.id });
  if (!finance) redirect("/customer/projects");

  return (
    <CustomerLayout title="Project Payments">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">Invoice summary</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{finance.project.request?.projectTitle ?? "Project"}</h2>
            <p className="text-sm text-muted">Vendor: {finance.project.vendor?.companyName ?? "Vendor"}</p>
          </div>
          <Button href={`/customer/projects/${id}`} variant="secondary">Back to tracking</Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <FinancialSummaryCard label="Project value" amount={finance.financial.projectValue} />
        <FinancialSummaryCard label="Advance paid" amount={finance.financial.advanceReceived} />
        <FinancialSummaryCard label="Total paid" amount={finance.financial.totalReceived} />
        <FinancialSummaryCard label="Pending amount" amount={finance.financial.pendingCustomerBalance} />
      </div>

      <RazorpayPaymentActions
        projectId={id}
        pendingBalance={finance.financial.pendingCustomerBalance}
        customer={{ name: customer.name, email: customer.email }}
        failedPayments={finance.payments.filter(
          (payment) =>
            payment.paymentMethod === "razorpay" &&
            payment.status === "failed" &&
            (payment.paymentType === "advance" || payment.paymentType === "milestone" || payment.paymentType === "final")
        )}
      />

      <div className="grid gap-4">
        {finance.payments.length === 0 ? (
          <Card><p className="text-sm text-muted">No payment records have been added yet.</p></Card>
        ) : finance.payments.map((payment) => <PaymentCard key={payment.id} payment={payment} />)}
      </div>
    </CustomerLayout>
  );
}
