import { redirect } from "next/navigation";
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FinancialSummaryCard } from "@/components/ui/FinancialSummaryCard";
import { PaymentCard } from "@/components/ui/PaymentCard";
import { getVendorFromCookie } from "@/lib/auth";
import { getProjectFinanceForRole } from "@/services/finance-service";
import { isApprovedVendor } from "@/services/vendor-service";

export default async function VendorProjectPaymentsPage({ params }: { params: Promise<{ id: string }> }) {
  const vendor = await getVendorFromCookie();
  if (!vendor) redirect("/auth?mode=login");
  if (!(await isApprovedVendor(vendor.id))) redirect("/vendor/pending");

  const { id } = await params;
  const finance = await getProjectFinanceForRole({ projectId: id, role: "vendor", userId: vendor.id });
  if (!finance) redirect("/vendor/projects");

  const vendorPayments = finance.payments.filter((payment) => payment.paymentDirection === "platform_to_vendor");

  return (
    <VendorLayout title="Project Payouts">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">Payout summary</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{finance.project.request?.projectTitle ?? "Project"}</h2>
            <p className="text-sm text-muted">Customer: {finance.project.customer?.companyName ?? "Customer"}</p>
          </div>
          <Button href={`/vendor/projects/${id}`} variant="secondary">Back to tracking</Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <FinancialSummaryCard label="Project value" amount={finance.financial.projectValue} />
        <FinancialSummaryCard label="Vendor paid" amount={finance.financial.vendorPaid} />
        <FinancialSummaryCard label="Pending payout" amount={finance.financial.pendingVendorPayout} />
      </div>

      <div className="grid gap-4">
        {vendorPayments.length === 0 ? (
          <Card><p className="text-sm text-muted">No payout records have been added yet.</p></Card>
        ) : vendorPayments.map((payment) => <PaymentCard key={payment.id} payment={payment} />)}
      </div>
    </VendorLayout>
  );
}
