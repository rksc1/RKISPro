import Link from "next/link";
import { VendorLayout } from "@/components/layout/VendorLayout";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { VendorCapabilityCard } from "@/components/ui/VendorCapabilityCard";
import { VendorTypeBadge } from "@/components/ui/VendorTypeBadge";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { getVendorFromCookie } from "@/lib/auth";
import { normalizeStatus } from "@/lib/status";
import { getVendorById } from "@/services/vendor-service";
import { getVendorAssignedRfqs } from "@/services/vendor-notification-service";
import { getVendorProjects } from "@/services/project-service";
import { getVendorFinanceSummary } from "@/services/finance-service";
import {
  AlertCircle,
  ArrowRight,
  Clock,
  Coins,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Briefcase,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VendorDashboardPage() {
  const session = await getVendorFromCookie();
  const [vendor, assignedRfqs, projects, finance] = session
    ? await Promise.all([
        getVendorById(session.id),
        getVendorAssignedRfqs(session.id),
        getVendorProjects(session.id),
        getVendorFinanceSummary(session.id).catch(() => ({
          payments: [],
          stats: { totalEarnings: 0, pendingPayouts: 0, totalProjectValue: 0 },
        })),
      ])
    : [null, [], [], { payments: [], stats: { totalEarnings: 0, pendingPayouts: 0, totalProjectValue: 0 } }];

  const vendorStatus = normalizeStatus(vendor?.status);
  const isEligible = vendorStatus === "approved";

  const pendingQuotes = assignedRfqs.filter(
    (n) => n.status === "Sent" || n.status === "Viewed"
  );
  const activeProjects = projects.filter(
    (p) => p.status === "in_progress" || p.status === "awarded"
  );
  const completedProjects = projects.filter((p) => p.status === "completed");

  const summaryCards = [
    {
      label: "RFQs Awaiting Quote",
      value: pendingQuotes.length,
      note: pendingQuotes.length > 0 ? "Immediate quotation required" : "All assigned RFQs quoted",
      href: "/vendor/rfqs",
      highlight: pendingQuotes.length > 0,
      icon: Clock,
    },
    {
      label: "Pending Escrow Payouts",
      value: `₹${finance.stats.pendingPayouts.toLocaleString("en-IN")}`,
      note: "Held in escrow; released upon QC sign-off",
      href: "/vendor/finance",
      icon: Coins,
    },
    {
      label: "Cleared Earnings",
      value: `₹${finance.stats.totalEarnings.toLocaleString("en-IN")}`,
      note: "All-time cleared bank transfers",
      href: "/vendor/finance",
      icon: FileCheck2,
    },
    {
      label: "Active Work Orders",
      value: activeProjects.length,
      note: "Projects currently on shop floor",
      href: "/vendor/projects",
      icon: Briefcase,
    },
    {
      label: "Completed Projects",
      value: vendor?.completedProjectsCount || completedProjects.length,
      note: "Delivered with zero defect sign-off",
      href: "/vendor/projects",
      icon: CheckCircle2,
    },
    {
      label: "Factory Audit Status",
      value: vendor?.verifiedBadge && vendor.verifiedBadge !== "none"
        ? `${vendor.verifiedBadge.toUpperCase()} Verified`
        : vendor?.verificationStatus === "verified" ? "Verified" : "Audit Pending",
      note: vendor?.auditScore ? `Score: ${vendor.auditScore}/80 pts` : "Physical on-site inspection",
      href: "/vendor/dashboard#profile",
      icon: ShieldCheck,
    },
  ];

  return (
    <VendorLayout title="Partner Machine Shop Command Center">
      {/* Onboarding & Eligibility Status Banner */}
      {!isEligible ? (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 sm:p-5 text-slate-900 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-500/20 p-2 text-amber-700 shrink-0">
              <AlertCircle className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Shop Floor Verification in Progress
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-3xl">
                Your workshop profile is currently undergoing technical review. Once our engineering operations team verifies your machine bed travel, power sanction, and primary steel sourcing capability, high-intent engineering RFQs will be routed to your queue.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-slate-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/20 p-2 text-emerald-700 shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-slate-900 text-sm">
                  Certified Partner Workshop · Eligible for Managed RFQs
                </h3>
                <VerifiedBadge badge={vendor?.verifiedBadge} score={vendor?.auditScore} size="sm" />
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Approved categories: <strong>{vendor?.services || "Fabrication & Machining"}</strong>
                {vendor?.auditorName ? ` · Audited by ${vendor.auditorName}` : ""}
              </p>
            </div>
          </div>
          <Link
            href="/vendor/rfqs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <span>View All Assigned RFQs</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}

      {/* Operational Metric Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group rounded-2xl border p-4 transition-all hover:shadow-md ${
                card.highlight
                  ? "border-amber-500 bg-amber-50/40 ring-1 ring-amber-500/30"
                  : "border-slate-200 bg-white hover:border-teal-500/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 group-hover:text-teal-700 transition-colors">
                  {card.label}
                </span>
                <Icon className={`size-4 ${card.highlight ? "text-amber-600" : "text-slate-400"}`} />
              </div>
              <strong className="mt-2 block text-xl sm:text-2xl font-black text-slate-900">
                {card.value}
              </strong>
              <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">{card.note}</p>
            </Link>
          );
        })}
      </div>

      {/* Action Required: Assigned RFQs Awaiting Quotation */}
      {pendingQuotes.length > 0 && (
        <Card className="border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                <h2 className="text-base font-bold text-slate-900">
                  Action Required: Assigned RFQs Awaiting Your Quote ({pendingQuotes.length})
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                These drawings have been curated and matched specifically to your machine capacity.
              </p>
            </div>
            <Link
              href="/vendor/rfqs"
              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="mt-3.5 divide-y divide-slate-100">
            {pendingQuotes.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {item.request.projectTitle}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-slate-500">
                    <span>{item.request.serviceType}</span>
                    <span>•</span>
                    <span>Material: <strong>{item.request.materialType}</strong></span>
                    <span>•</span>
                    <span>Plant: {item.request.location}</span>
                    <span>•</span>
                    <span className="text-amber-700 font-semibold">
                      Target: {item.request.deadline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.request.drawingUrls?.length > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      <FileText className="size-3.5 text-slate-500" />
                      {item.request.drawingUrls.length} File(s)
                    </span>
                  )}
                  <Link
                    href={`/vendor/rfqs/${item.id}/quote`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700"
                  >
                    <span>Submit Quote</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Active Manufacturing Projects & Milestone Checkpoints */}
      {activeProjects.length > 0 && (
        <Card>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Active Manufacturing Orders on Shop Floor
              </h2>
              <p className="text-xs text-slate-500">
                Execute production, upload MTC/dimensional inspection reports, and trigger milestone releases.
              </p>
            </div>
            <Link
              href="/vendor/projects"
              className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
            >
              <span>All Projects</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="mt-3.5 divide-y divide-slate-100">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {project.id.slice(0, 8)}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {project.request?.projectTitle || "Custom Production Work Order"}
                    </h3>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-slate-500">
                    <span>Buyer: <strong>{project.customer?.companyName || "Industrial Client"}</strong></span>
                    <span>•</span>
                    <span>Contract Value: <strong>₹{Number(project.projectValue || 0).toLocaleString("en-IN")}</strong></span>
                    {project.expectedDeliveryDate && (
                      <>
                        <span>•</span>
                        <span>Delivery SLA: {project.expectedDeliveryDate}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/vendor/projects/${project.id}/payments`}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <span>Payout Record</span>
                  </Link>
                  <Link
                    href={`/vendor/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-700"
                  >
                    <span>Update Milestones</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Split Grid: Shop Floor Details & Capability Matrix */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 id="profile" className="text-base font-bold text-slate-900">
                Workshop Profile
              </h2>
              <p className="text-xs text-slate-500">Primary legal entity and facility specs.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {vendor ? <VendorTypeBadge type={vendor.vendorType} /> : null}
              {vendor ? <StatusBadge status={vendor.status} /> : null}
            </div>
          </div>

          <div className="mt-3.5 grid gap-2.5 text-xs sm:grid-cols-2 text-slate-600">
            <div>
              <span className="text-slate-400 block">Registered Entity:</span>
              <strong className="text-slate-900 text-sm">
                {vendor?.vendorType === "individual" ? vendor.fullName : vendor?.companyName}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block">Managing Partner / Owner:</span>
              <strong className="text-slate-900">{vendor?.ownerName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">GSTIN:</span>
              <span className="font-mono text-slate-900 font-bold">{vendor?.gstNumber || "Unregistered"}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Industrial Cluster:</span>
              <span className="text-slate-900 font-medium">
                {vendor?.city ?? vendor?.location}, {vendor?.state ?? "India"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Shop Floor Workforce:</span>
              <span className="text-slate-900 font-medium">{vendor?.workerCount || "N/A"} Machine Operators</span>
            </div>
            <div>
              <span className="text-slate-400 block">Industry Experience:</span>
              <span className="text-slate-900 font-medium">{vendor?.experienceYears || "0"} Years in Precision Fab</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid gap-2 text-xs">
            <div>
              <span className="text-slate-400 block">Approved Service Categories:</span>
              <span className="text-slate-800 font-semibold">{vendor?.services || "Under Review"}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Machinery &amp; Bed Travels:</span>
              <span className="text-slate-800 font-semibold">{vendor?.machinery || "No machinery listed"}</span>
            </div>
          </div>
        </Card>

        {vendor ? <VendorCapabilityCard vendor={vendor} /> : null}
      </div>
    </VendorLayout>
  );
}
