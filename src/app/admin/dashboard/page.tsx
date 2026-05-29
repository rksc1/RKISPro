import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { getAdminDashboardStats } from "@/services/admin-service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();
  const workflowSteps = ["review", "shortlist", "distribute", "compare", "award", "track", "settle"];
  const queueCards = [
    { label: "RFQ Intake Queue", value: stats.rfqIntakeQueue, note: "review new requirements" },
    { label: "Vendor Matching Queue", value: stats.vendorMatchingQueue, note: "shortlist and distribute RFQs" },
    { label: "Quote Review Queue", value: stats.quoteReviewQueue, note: "compare quotations before customer view" },
    { label: "Vendor Verification Queue", value: stats.vendorVerificationQueue, note: "approve categories and verification" },
    { label: "Project Risk Queue", value: stats.projectRiskQueue, note: "track delayed or blocked execution" },
    { label: "Payment Queue", value: stats.paymentQueue, note: "settle pending payments and payouts" }
  ];

  return (
    <AdminLayout title="Operations command center">
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Total customers" value={stats.totalCustomers} note="Registered buying organizations" />
        <StatCard label="Verified Vendor Network" value={stats.totalVendors} note="Registered vendor profiles" />
        <StatCard label="Pending verification" value={stats.pendingVendorApprovals} note="Vendor profiles awaiting review" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {queueCards.map((card) => (
          <Card className="border-l-4 border-l-brand-gold" key={card.label}>
            <span className="text-sm font-semibold text-muted">{card.label}</span>
            <strong className="mt-2 block text-3xl text-slate-950">{card.value}</strong>
            <p className="mt-2 text-sm text-muted">{card.note}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h2 id="workflow" className="text-xl font-bold">Managed RFQ workflow</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Review intake, shortlist vendors, distribute RFQs, compare structured quotations, award execution-fit vendors, track milestones, and settle payments.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {workflowSteps.map((step) => (
            <span className="rounded-full bg-canvas px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-dark" key={step}>
              {step}
            </span>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}
