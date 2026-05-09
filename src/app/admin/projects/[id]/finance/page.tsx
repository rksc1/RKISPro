import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FinancialSummaryCard } from "@/components/ui/FinancialSummaryCard";
import { PaymentCard } from "@/components/ui/PaymentCard";
import { getAdminFromCookie } from "@/lib/auth";
import { getProjectFinanceForRole } from "@/services/finance-service";
import type { PaymentDirection, PaymentStatus, PaymentType } from "@/types/auth";

const paymentTypes: PaymentType[] = ["advance", "milestone", "final", "refund", "commission"];
const paymentDirections: PaymentDirection[] = ["customer_to_platform", "platform_to_vendor", "customer_to_vendor"];
const paymentStatuses: PaymentStatus[] = ["pending", "paid", "failed", "refunded"];

export default async function AdminProjectFinancePage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  const finance = await getProjectFinanceForRole({ projectId: id, role: "admin", userId: admin.id });
  if (!finance) redirect("/admin/projects");

  return (
    <AdminLayout title="Project Finance">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">Financial ledger</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{finance.project.request?.projectTitle ?? "Project"}</h2>
            <p className="text-sm text-muted">
              {finance.project.customer?.companyName} / {finance.project.vendor?.companyName}
            </p>
          </div>
          <Button href={`/admin/projects/${id}`} variant="secondary">Back to project</Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <FinancialSummaryCard label="Project value" amount={finance.financial.projectValue} />
        <FinancialSummaryCard label="Advance received" amount={finance.financial.advanceReceived} />
        <FinancialSummaryCard label="Total received" amount={finance.financial.totalReceived} />
        <FinancialSummaryCard label="Vendor paid" amount={finance.financial.vendorPaid} />
        <FinancialSummaryCard label="Pending customer balance" amount={finance.financial.pendingCustomerBalance} />
        <FinancialSummaryCard label="Pending vendor payout" amount={finance.financial.pendingVendorPayout} />
        <FinancialSummaryCard label="Commission" amount={finance.financial.commissionAmount} detail={`${finance.financial.commissionPercentage}%`} />
        <FinancialSummaryCard label="Profit amount" amount={finance.financial.profitAmount} />
      </div>

      <Card>
        <h3 className="text-lg font-black text-slate-950">Add payment record</h3>
        <form action={`/api/admin/projects/${id}/payments`} className="mt-4 grid gap-4 md:grid-cols-3" method="post">
          <label className="grid gap-2 text-sm font-semibold">
            Type
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="paymentType">
              {paymentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Direction
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="paymentDirection">
              {paymentDirections.map((direction) => <option key={direction} value={direction}>{direction.replaceAll("_", " ")}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Status
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="status">
              {paymentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Amount
            <input className="min-h-11 rounded-md border border-line px-3" min="1" name="amount" required type="number" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Method
            <input className="min-h-11 rounded-md border border-line px-3" name="paymentMethod" placeholder="cash, upi, bank_transfer" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Reference
            <input className="min-h-11 rounded-md border border-line px-3" name="referenceNumber" />
          </label>
          <label className="grid gap-2 text-sm font-semibold md:col-span-3">
            Notes
            <textarea className="min-h-24 rounded-md border border-line px-3 py-2" name="notes" />
          </label>
          <div className="md:col-span-3">
            <Button type="submit">Save payment</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4">
        {finance.payments.length === 0 ? (
          <Card><p className="text-sm text-muted">No payment records yet.</p></Card>
        ) : finance.payments.map((payment) => {
          const isLockedRazorpayPayment = payment.paymentMethod === "razorpay" && payment.status === "paid";
          return (
          <PaymentCard
            key={payment.id}
            payment={payment}
            actions={isLockedRazorpayPayment ? (
              <p className="rounded-md bg-canvas p-3 text-sm font-semibold text-muted">
                Paid Razorpay payments are locked. Add a separate adjustment or note record if finance needs reconciliation.
              </p>
            ) : (
              <form action={`/api/admin/projects/${id}/payments/${payment.id}`} className="grid gap-3 border-t border-line pt-4 md:grid-cols-5" method="post">
                <select className="min-h-10 rounded-md border border-line bg-white px-3 text-sm" name="status" defaultValue={payment.status}>
                  {paymentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <input className="min-h-10 rounded-md border border-line px-3 text-sm" name="paymentMethod" placeholder="Method" defaultValue={payment.paymentMethod ?? ""} />
                <input className="min-h-10 rounded-md border border-line px-3 text-sm" name="referenceNumber" placeholder="Reference" defaultValue={payment.referenceNumber ?? ""} />
                <input className="min-h-10 rounded-md border border-line px-3 text-sm" name="notes" placeholder="Notes" defaultValue={payment.notes ?? ""} />
                <Button type="submit">Update</Button>
              </form>
            )}
          />
        )})}
      </div>
    </AdminLayout>
  );
}
