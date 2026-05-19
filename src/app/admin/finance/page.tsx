import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FinanceOverviewStats } from "@/components/ui/FinanceOverviewStats";
import { TransactionTable } from "@/components/ui/TransactionTable";
import { getAdminFromCookie } from "@/lib/auth";
import { getAdminFinance } from "@/services/finance-service";
import type { PaymentStatus, PaymentType } from "@/types/auth";

const paymentStatuses: Array<PaymentStatus | ""> = ["", "pending", "paid", "failed", "refunded"];
const paymentTypes: Array<PaymentType | ""> = ["", "advance", "milestone", "final", "refund", "commission"];

export default async function AdminFinancePage({
  searchParams
}: {
  searchParams: Promise<{
    projectId?: string;
    status?: PaymentStatus | "";
    paymentType?: PaymentType | "";
    dateFrom?: string;
    dateTo?: string;
  }>;
}) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/auth?mode=login");

  const filters = await searchParams;
  const finance = await getAdminFinance(filters);

  return (
    <AdminLayout title="Finance">
      <FinanceOverviewStats stats={finance.stats} />

      <Card>
        <form className="grid gap-4 md:grid-cols-5" method="get">
          <label className="grid gap-2 text-sm font-semibold">
            Project ID
            <input className="min-h-11 rounded-md border border-line px-3" name="projectId" defaultValue={filters.projectId ?? ""} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Status
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="status" defaultValue={filters.status ?? ""}>
              {paymentStatuses.map((status) => <option key={status || "all"} value={status}>{status || "All status"}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Type
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="paymentType" defaultValue={filters.paymentType ?? ""}>
              {paymentTypes.map((type) => <option key={type || "all"} value={type}>{type || "All types"}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            From
            <input className="min-h-11 rounded-md border border-line px-3" name="dateFrom" type="date" defaultValue={filters.dateFrom ?? ""} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            To
            <input className="min-h-11 rounded-md border border-line px-3" name="dateTo" type="date" defaultValue={filters.dateTo ?? ""} />
          </label>
          <div className="flex gap-2 md:col-span-5">
            <Button type="submit">Apply filters</Button>
            <Button href="/admin/finance" variant="secondary">Reset</Button>
          </div>
        </form>
      </Card>

      <TransactionTable payments={finance.payments} />
    </AdminLayout>
  );
}
