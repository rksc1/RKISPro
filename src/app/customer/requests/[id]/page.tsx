import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getCustomerFromCookie } from "@/lib/auth";
import { getMarketplaceRequestById } from "@/services/marketplace-request-service";
import { getApprovedQuotesForCustomerRequest } from "@/services/vendor-quote-service";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Download,
  FileCheck,
  FileText,
  Layers,
  ShieldCheck
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerRequestDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, customer] = await Promise.all([params, getCustomerFromCookie()]);

  if (!customer) notFound();

  const request = await getMarketplaceRequestById(id);
  if (!request || request.customerId !== customer.id) {
    notFound();
  }

  const { quotes } = await getApprovedQuotesForCustomerRequest(id, customer.id);
  const isQuotesReady = request.status === "quotes_ready" || quotes.length > 0;
  const isAwarded = request.status === "awarded";

  // Stepper Stage logic
  const stages = [
    { label: "Submitted", done: true },
    { label: "Engineering Vetting", done: request.status !== "Pending" },
    { label: "Contractor Matching", done: ["Distributed", "quotes_ready", "awarded"].includes(request.status) },
    { label: "Quotes Ready", done: isQuotesReady || isAwarded },
    { label: "Awarded & Escrow", done: isAwarded }
  ];

  return (
    <CustomerLayout title="Requirement Details">
      <div className="grid gap-6">
        {/* Top Back Navigation & Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/customer/requests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition"
          >
            <ArrowLeft className="size-4" />
            <span>Back to All Requirements</span>
          </Link>

          {isQuotesReady ? (
            <Button href={`/customer/requests/${request.id}/quotes`} className="gap-2 shadow-sm">
              <span>Compare {quotes.length > 0 ? `${quotes.length} ` : ""}Quotation(s)</span>
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-900 border border-amber-200">
              <Clock className="size-4 text-amber-600" />
              <span>Quotes Under Engineering Review</span>
            </div>
          )}
        </div>

        {/* Hero Card */}
        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900">{request.projectTitle}</h1>
              <StatusBadge status={request.status} />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed sm:text-base">{request.description}</p>

            <div className="mt-3 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/60 p-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Service Type</span>
                <p className="mt-1 text-sm font-bold text-slate-900">{request.serviceType}</p>
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/60 p-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Material</span>
                <p className="mt-1 text-sm font-bold text-slate-900">{request.materialType}</p>
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/60 p-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Delivery Site</span>
                <p className="mt-1 text-sm font-bold text-slate-900">{request.location}</p>
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/60 p-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expected Deadline</span>
                <p className="mt-1 text-sm font-bold text-slate-900">{request.deadline}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Managed Lifecycle Stepper */}
        <Card>
          <h2 className="text-base font-bold text-slate-900">Procurement Progress Tracker</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            RKISPro engineers ensure every quote matches tolerances and delivery schedules before awarding.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {stages.map((stage, idx) => (
              <div
                key={stage.label}
                className={`relative rounded-xl border p-3.5 transition-all ${
                  stage.done
                    ? "border-teal-500/40 bg-teal-50/40 text-teal-950"
                    : "border-slate-200 bg-slate-50/40 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${
                      stage.done ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold leading-tight">{stage.label}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Specifications & Drawing Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Detailed Technical Specs */}
          <Card>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="size-4 text-teal-600" />
              Technical & Commercial Specifications
            </h2>

            <dl className="mt-4 grid gap-3 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between py-2">
                <dt className="text-slate-500">Required Quantity</dt>
                <dd className="font-semibold text-slate-900">{request.quantity || "As per drawings / job description"}</dd>
              </div>
              <div className="py-2">
                <dt className="text-slate-500">Technical Requirements & Tolerances</dt>
                <dd className="mt-1 font-medium text-slate-800 whitespace-pre-wrap">
                  {request.technicalRequirements || "Standard commercial manufacturing tolerances"}
                </dd>
              </div>
              <div className="py-2">
                <dt className="text-slate-500">Quality & Testing Expectations</dt>
                <dd className="mt-1 font-medium text-slate-800 whitespace-pre-wrap">
                  {request.qualityExpectations || "Visual and dimensional inspection upon delivery"}
                </dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-500">Site Inspection</dt>
                <dd className="font-semibold text-slate-900">{request.inspectionRequirement || "Standard acceptance"}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-500">GST Invoice Strict Requirement</dt>
                <dd className="font-semibold text-teal-700">
                  {request.gstRequirement ? "Mandatory GST Compliance" : "Standard"}
                </dd>
              </div>
              {request.budgetRange && (
                <div className="flex justify-between py-2">
                  <dt className="text-slate-500">Customer Target Budget</dt>
                  <dd className="font-semibold text-slate-900">{request.budgetRange}</dd>
                </div>
              )}
            </dl>
          </Card>

          {/* Attached Drawings & Documents */}
          <Card>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="size-4 text-teal-600" />
              Drawings & Technical Documents ({request.drawingUrls?.length || 0})
            </h2>

            {request.drawingUrls && request.drawingUrls.length > 0 ? (
              <div className="mt-4 grid gap-2.5">
                {request.drawingUrls.map((url, i) => (
                  <div
                    key={url}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="size-5 shrink-0 text-teal-600" />
                      <span className="truncate text-sm font-semibold text-slate-800">
                        Attachment {i + 1}
                      </span>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-teal-500 hover:text-teal-600 shadow-2xs transition"
                    >
                      <Download className="size-3.5" />
                      <span>View / Download</span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                No external drawings uploaded. Work is scoped based on the title and description provided.
              </div>
            )}

            {/* Escrow & Trust Assurance */}
            <div className="mt-6 rounded-xl border border-teal-200/80 bg-teal-50/40 p-4">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-900">
                <ShieldCheck className="size-4 text-teal-600" />
                RKISPro Escrow Protection
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-teal-800">
                When you award this requirement to a matched contractor, your advance is held in escrow and released only as milestones are verified and approved by you.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}
