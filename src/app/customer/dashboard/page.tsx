import Link from "next/link";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatStatus, normalizeStatus } from "@/lib/status";
import { getCustomerFromCookie } from "@/lib/auth";
import { getCustomerById } from "@/services/customer-service";
import { getCustomerMarketplaceRequests } from "@/services/marketplace-request-service";
import { getCustomerProjects } from "@/services/project-service";
import {
  FileText,
  Calculator,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Wrench,
  ChevronRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerDashboardPage() {
  const session = await getCustomerFromCookie();
  const [customer, requests, projects] = session
    ? await Promise.all([
        getCustomerById(session.id),
        getCustomerMarketplaceRequests(session.id),
        getCustomerProjects(session.id),
      ])
    : [null, [], []];

  const countByStatus = (statuses: string[]) =>
    requests.filter((request) => statuses.includes(normalizeStatus(request.status))).length;

  const activeProjects = projects.filter(
    (p) => p.status === "in_progress" || p.status === "awarded"
  );
  const completedProjects = projects.filter((p) => p.status === "completed");
  const quotesReadyRequests = requests.filter(
    (r) => normalizeStatus(r.status) === "approved" || normalizeStatus(r.status) === "distributed"
  );

  const totalCommittedValue = projects.reduce(
    (sum, p) => sum + Number(p.projectValue || 0),
    0
  );

  const summaryCards = [
    {
      label: "RFQs Under Review",
      value: countByStatus(["pending"]),
      note: "Engineering review by RKISPro QA",
      href: "/customer/requests",
    },
    {
      label: "Quotes Ready to Compare",
      value: quotesReadyRequests.length,
      note: "Standardized contractor bids",
      href: "/customer/requests",
      highlight: quotesReadyRequests.length > 0,
    },
    {
      label: "Active Production Projects",
      value: activeProjects.length,
      note: "In fabrication / shop-floor QC",
      href: "/customer/projects",
    },
    {
      label: "Completed Work Orders",
      value: completedProjects.length,
      note: "Delivered with MTC & gate pass",
      href: "/customer/projects",
    },
    {
      label: "Total Production Value",
      value: `₹${(totalCommittedValue / 100000).toFixed(1)}L`,
      note: "Committed across all work orders",
      href: "/customer/projects",
    },
    {
      label: "Audited Machine Shops",
      value: "50+",
      note: "Verified in MIDC & Peenya clusters",
      href: "/customer/vendors",
    },
  ];

  return (
    <CustomerLayout title="Industrial Procurement Dashboard">
      {/* High-priority Action Alert for Ready Quotations */}
      {quotesReadyRequests.length > 0 && (
        <div className="rounded-2xl border border-teal-500/40 bg-teal-500/10 p-4 sm:p-5 text-slate-900 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-teal-500/20 p-2 text-teal-700 shrink-0">
                <AlertCircle className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Structured Quotes Ready for Review ({quotesReadyRequests.length})
                </h3>
                <p className="mt-0.5 text-xs text-slate-600">
                  RKISPro has audited and matched contractor bids for:{" "}
                  <strong>{quotesReadyRequests[0]?.projectTitle}</strong>
                </p>
              </div>
            </div>
            <Link
              href={`/customer/requests/${quotesReadyRequests[0]?.id}/quotes`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
            >
              <span>Compare Contractor Bids</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {summaryCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group rounded-2xl border p-4 transition-all hover:shadow-md ${
              card.highlight
                ? "border-teal-500 bg-teal-50/40 ring-1 ring-teal-500/30"
                : "border-slate-200 bg-white hover:border-teal-500/40"
            }`}
          >
            <span className="text-xs font-semibold text-slate-500 group-hover:text-teal-700 transition-colors">
              {card.label}
            </span>
            <strong className="mt-2 block text-2xl font-black text-slate-900">
              {card.value}
            </strong>
            <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">{card.note}</p>
          </Link>
        ))}
      </div>

      {/* 4-Pillar Engineering & Procurement Launchers */}
      <div>
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
          Procurement & Engineering Workflows
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/customer/request/new"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
          >
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
                <FileText className="size-5" />
              </div>
              <h3 className="mt-3.5 font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                Post Managed RFQ
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Upload CAD step files or technical drawings for structured, audited bids.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-teal-600">
              <span>Start RFQ Wizard</span>
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/customer/estimator"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
          >
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Calculator className="size-5" />
              </div>
              <h3 className="mt-3.5 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Cost & Lead-Time Estimator
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Get instant benchmark rates for MS, SS 304 fabrication &amp; CNC machining hours.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-blue-600">
              <span>Calculate Estimate</span>
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/customer/vendors"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
          >
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Building2 className="size-5" />
              </div>
              <h3 className="mt-3.5 font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Audited Contractor Directory
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Browse 50+ machine shops filtered by VMC axes, laser tonnage, and city cluster.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-indigo-600">
              <span>Browse Workshops</span>
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/customer/quick-booking/new"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-md"
          >
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Wrench className="size-5" />
              </div>
              <h3 className="mt-3.5 font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Emergency Breakdown Visit
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Need urgent on-site repair? Technician dispatched to your plant gate in &lt; 4 hours.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-600">
              <span>Book Field Service</span>
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>

      {/* Active Manufacturing Projects Strip */}
      {activeProjects.length > 0 && (
        <Card>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Active Production Projects</h2>
              <p className="text-xs text-slate-500">
                Real-time milestone tracking, dimensional QC gates, and CBIC tax invoices.
              </p>
            </div>
            <Link
              href="/customer/projects"
              className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
            >
              <span>View All Projects</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {activeProjects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>
                      <strong>Contractor:</strong> {project.vendor?.companyName || "Audited Vendor"}
                    </span>
                    <span>•</span>
                    <span>
                      <strong>Value:</strong> ₹{Number(project.projectValue || 0).toLocaleString("en-IN")}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <ShieldCheck className="size-3.5" />
                      4-Gate QC Active
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/customer/projects/${project.id}/invoice`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <Receipt className="size-3.5 text-slate-500" />
                    <span>Tax Invoice</span>
                  </Link>
                  <Link
                    href={`/customer/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-700"
                  >
                    <span>Inspect Milestones</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Split Grid: Profile & Recent Managed RFQs */}
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Procurement Account</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="size-3" />
              Verified Buyer
            </span>
          </div>
          <div className="mt-3.5 grid gap-2.5 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">Authorized Contact:</span>
              <strong className="text-slate-900">{customer?.name}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">Enterprise Entity:</span>
              <strong className="text-slate-900">{customer?.companyName}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">Email:</span>
              <span className="text-slate-900 font-mono">{customer?.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">Phone:</span>
              <span className="text-slate-900">{customer?.phone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Primary Plant Location:</span>
              <span className="text-slate-900">{customer?.location}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 id="requests" className="text-base font-bold text-slate-900">
                Recent Job Requirements
              </h2>
              <p className="text-xs text-slate-500">Live status of requirements in engineering intake.</p>
            </div>
            <Button href="/customer/request/new" className="text-xs py-1.5 px-3">
              + Post New
            </Button>
          </div>

          <div className="mt-3.5 grid gap-3">
            {requests.slice(0, 4).map((request) => {
              const statusNormalized = normalizeStatus(request.status);
              const hasQuotesReady =
                statusNormalized === "approved" || statusNormalized === "distributed";

              return (
                <div
                  className="rounded-xl border border-slate-200 p-3.5 transition hover:border-teal-500/50 hover:bg-slate-50/50"
                  key={request.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/customer/requests/${request.id}`}
                        className="font-bold text-slate-900 hover:text-teal-600 transition text-sm"
                      >
                        {request.projectTitle}
                      </Link>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {request.serviceType} | {request.materialType} | {request.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                      {formatStatus(request.status)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">
                      Target: {request.deadline} • Files: {request.drawingUrls?.length || 0}
                    </span>
                    {hasQuotesReady ? (
                      <Link
                        href={`/customer/requests/${request.id}/quotes`}
                        className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
                      >
                        <span>Compare Quotes</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    ) : (
                      <Link
                        href={`/customer/requests/${request.id}`}
                        className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}

            {requests.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
                <FileText className="mx-auto size-8 text-slate-400" />
                <h3 className="mt-2 text-sm font-bold text-slate-900">No Requirements Posted</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Post your technical drawing or CAD file to receive 3–5 matched contractor bids.
                </p>
                <div className="mt-4">
                  <Button href="/customer/request/new" className="text-xs py-1.5 px-4">
                    Post Your First Requirement
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </CustomerLayout>
  );
}
