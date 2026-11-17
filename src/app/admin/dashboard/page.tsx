import Link from "next/link";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { getAdminDashboardStats } from "@/services/admin-service";
import {
  FileText,
  Building2,
  Users,
  Coins,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Wrench,
  Layers,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  const pipelineStages = [
    { id: "intake", name: "1. Intake Review", count: stats.rfqIntakeQueue, href: "/admin/requests?status=Pending" },
    { id: "matching", name: "2. Shop Matching", count: stats.vendorMatchingQueue, href: "/admin/requests?status=Approved" },
    { id: "quotes", name: "3. Quote Audit", count: stats.quoteReviewQueue, href: "/admin/quotes" },
    { id: "projects", name: "4. Execution & QC", count: stats.projectRiskQueue, href: "/admin/projects?status=in_progress" },
    { id: "finance", name: "5. Escrow Settle", count: stats.paymentQueue, href: "/admin/finance" },
  ];

  const queueCards = [
    {
      label: "RFQ Intake Queue",
      value: stats.rfqIntakeQueue,
      note: "Review drawings & specifications",
      href: "/admin/requests?status=Pending",
      urgent: stats.rfqIntakeQueue > 0,
      icon: FileText,
      color: "teal",
    },
    {
      label: "Emergency Breakdown Visits",
      value: stats.quickBookingQueue,
      note: "Technician dispatch SLA < 4h",
      href: "/admin/quick-bookings",
      urgent: stats.quickBookingQueue > 0,
      icon: Wrench,
      color: "amber",
    },
    {
      label: "Vendor Matching Queue",
      value: stats.vendorMatchingQueue,
      note: "Shortlist 3–5 audited machine shops",
      href: "/admin/requests?status=Approved",
      urgent: false,
      icon: Layers,
      color: "teal",
    },
    {
      label: "Contractor Quote Review",
      value: stats.quoteReviewQueue,
      note: "Normalize BOM & margin before client view",
      href: "/admin/quotes",
      urgent: stats.quoteReviewQueue > 0,
      icon: Clock,
      color: "indigo",
    },
    {
      label: "Workshop Audit Queue",
      value: stats.vendorVerificationQueue,
      note: "Physical machine & GST verification",
      href: "/admin/vendors?verificationStatus=pending",
      urgent: stats.vendorVerificationQueue > 0,
      icon: Building2,
      color: "blue",
    },
    {
      label: "Project Risk & Overdue QC",
      value: stats.projectRiskQueue,
      note: "Milestone delays & inspection blockers",
      href: "/admin/projects?status=in_progress",
      urgent: stats.projectRiskQueue > 0,
      icon: AlertTriangle,
      color: "rose",
    },
    {
      label: "Milestone Escrow Payouts",
      value: stats.paymentQueue,
      note: "Pending vendor releases post-QC sign-off",
      href: "/admin/finance",
      urgent: stats.paymentQueue > 0,
      icon: Coins,
      color: "emerald",
    },
  ];

  return (
    <AdminLayout title="Operations Command Center">
      {/* Top High-Level Network Health Bar */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Buying Entities</span>
            <Users className="size-4 text-teal-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{stats.totalCustomers}</p>
          <p className="mt-1 text-[11px] text-slate-400">Registered engineering clients</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Audited Workshops</span>
            <Building2 className="size-4 text-indigo-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{stats.totalVendors}</p>
          <p className="mt-1 text-[11px] text-slate-400">Machine shops &amp; fabricators</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Pending Audits</span>
            <ShieldCheck className="size-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-amber-700">{stats.pendingVendorApprovals}</p>
          <p className="mt-1 text-[11px] text-slate-400">Awaiting shop-floor inspection</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Live Bottlenecks</span>
            <AlertTriangle className="size-4 text-rose-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-rose-700">
            {stats.rfqIntakeQueue + stats.quickBookingQueue + stats.projectRiskQueue}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">Items requiring operations action</p>
        </div>
      </div>

      {/* Interactive 5-Stage Procurement Pipeline Navigator */}
      <Card>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Managed Procurement Pipeline Stages</h2>
            <p className="text-xs text-slate-500">Click any stage to jump directly into the active operations queue.</p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Live Queue Tracker
          </span>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {pipelineStages.map((stage) => (
            <Link
              key={stage.id}
              href={stage.href}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition hover:border-teal-500 hover:bg-teal-50/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 group-hover:text-teal-700">
                  {stage.name}
                </span>
                <span className="font-mono text-xs font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {stage.count}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-end text-[11px] font-bold text-teal-600">
                <span>View Queue</span>
                <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Operational Action Queues (Interactive Grid) */}
      <div>
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
          Operational Queues &amp; Action Items
        </h2>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {queueCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className={`group flex flex-col justify-between rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  card.urgent
                    ? "border-amber-400 bg-amber-50/30 ring-1 ring-amber-400/20"
                    : "border-slate-200 bg-white hover:border-teal-500/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
                      {card.label}
                    </span>
                    <div
                      className={`flex size-8 items-center justify-center rounded-lg ${
                        card.urgent ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <strong className="mt-2 block text-3xl font-black text-slate-900">
                    {card.value}
                  </strong>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{card.note}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
                  <span>Open Operations Queue</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
