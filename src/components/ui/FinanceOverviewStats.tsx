import { FinancialSummaryCard } from "@/components/ui/FinancialSummaryCard";

export function FinanceOverviewStats({
  stats
}: {
  stats: {
    totalProjectValue: number;
    totalAdvances: number;
    totalCommissions: number;
    pendingVendorPayouts: number;
    revenueAnalytics: number;
    completedPayments: number;
    pendingPayments: number;
  };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
      <FinancialSummaryCard label="Total project value" amount={stats.totalProjectValue} />
      <FinancialSummaryCard label="Total advances" amount={stats.totalAdvances} />
      <FinancialSummaryCard label="Total commissions" amount={stats.totalCommissions} />
      <FinancialSummaryCard label="Pending vendor payouts" amount={stats.pendingVendorPayouts} />
      <FinancialSummaryCard label="Revenue analytics" amount={stats.revenueAnalytics} />
      <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold text-muted">Completed payments</p>
        <p className="mt-2 text-2xl font-black text-slate-950">{stats.completedPayments}</p>
      </div>
      <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold text-muted">Pending payments</p>
        <p className="mt-2 text-2xl font-black text-slate-950">{stats.pendingPayments}</p>
      </div>
    </div>
  );
}
