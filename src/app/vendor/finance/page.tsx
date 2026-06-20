import { redirect } from "next/navigation";
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card } from "@/components/ui/Card";
import { TransactionTable } from "@/components/ui/TransactionTable";
import { getVendorFromCookie } from "@/lib/auth";
import { getVendorFinanceSummary } from "@/services/finance-service";

export const dynamic = "force-dynamic";

export default async function VendorFinancePage() {
  const vendor = await getVendorFromCookie();
  if (!vendor) redirect("/auth?mode=login");

  const finance = await getVendorFinanceSummary(vendor.id);

  // Filter to show only payments directed to the vendor (from platform or customer)
  const vendorPayments = finance.payments.filter(
    (p) => p.paymentDirection === "platform_to_vendor" || p.paymentDirection === "customer_to_vendor"
  );

  return (
    <VendorLayout title="Finance & Payments">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-brand-dark to-slate-900 text-white">
          <h3 className="text-sm font-semibold text-slate-300">Total Earnings</h3>
          <p className="mt-2 text-3xl font-black">₹{finance.stats.totalEarnings.toLocaleString()}</p>
          <p className="mt-1 text-xs text-slate-400">All-time cleared payouts</p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-muted">Pending Payouts</h3>
          <p className="mt-2 text-3xl font-black text-amber-600">₹{finance.stats.pendingPayouts.toLocaleString()}</p>
          <p className="mt-1 text-xs text-muted">Awaiting transfer from RKISPro</p>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-muted">Total Project Value</h3>
          <p className="mt-2 text-3xl font-black text-slate-950">₹{finance.stats.totalProjectValue.toLocaleString()}</p>
          <p className="mt-1 text-xs text-muted">Gross value of all awarded projects</p>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Payout History</h2>
        <TransactionTable payments={vendorPayments} />
      </div>
    </VendorLayout>
  );
}
