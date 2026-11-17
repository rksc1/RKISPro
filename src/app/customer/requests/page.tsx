import Link from "next/link";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getCustomerFromCookie } from "@/lib/auth";
import { getCustomerMarketplaceRequests } from "@/services/marketplace-request-service";
import { ArrowRight, Clock, FileText, Layers, MapPin, Plus, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerRequestsPage() {
  const customer = await getCustomerFromCookie();
  if (!customer) return null;

  const requests = await getCustomerMarketplaceRequests(customer.id);

  return (
    <CustomerLayout title="My Industrial Requests">
      <div className="grid gap-6">
        {/* Header Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Managed RFQs & Requirements</h1>
            <p className="mt-1 text-sm text-slate-500">
              Track the engineering review, contractor shortlisting, and quotation status for all your posted industrial jobs.
            </p>
          </div>
          <Button href="/customer/request/new" className="gap-2">
            <Plus className="size-4" />
            <span>Post New Requirement</span>
          </Button>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <Card className="text-center py-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <FileText className="size-7" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">No Industrial RFQs Posted Yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 leading-relaxed">
              When you post custom fabrication, machining, CNC, or structural engineering requirements, RKISPro reviews the specs, shortlists vetted vendors, and collects structured bids for you.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/customer/request/new" className="gap-2">
                <Plus className="size-4" />
                <span>Post Your First RFQ</span>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => {
              const hasQuotesReady = request.status === "quotes_ready";

              return (
                <Card
                  key={request.id}
                  className={`transition hover:border-teal-500/50 hover:shadow-md ${
                    hasQuotesReady ? "border-teal-500/40 bg-teal-50/10 ring-1 ring-teal-500/20" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="grid gap-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Link
                          href={`/customer/requests/${request.id}`}
                          className="text-lg font-bold text-slate-900 hover:text-teal-600 transition"
                        >
                          {request.projectTitle}
                        </Link>
                        <StatusBadge status={request.status} />
                      </div>

                      <p className="line-clamp-2 text-sm text-slate-600 leading-relaxed">
                        {request.description}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Layers className="size-3.5 text-teal-600" />
                          <strong>Service:</strong> {request.serviceType}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="size-3.5 text-teal-600" />
                          <strong>Material:</strong> {request.materialType}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-teal-600" />
                          {request.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-teal-600" />
                          <strong>Deadline:</strong> {request.deadline}
                        </span>
                        {request.drawingUrls?.length > 0 && (
                          <span className="flex items-center gap-1.5">
                            <FileText className="size-3.5 text-teal-600" />
                            {request.drawingUrls.length} File(s)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-row sm:flex-col gap-2">
                      {hasQuotesReady ? (
                        <Button href={`/customer/requests/${request.id}/quotes`} className="gap-2 whitespace-nowrap">
                          <span>Compare Quotes</span>
                          <ArrowRight className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          href={`/customer/requests/${request.id}`}
                          variant="secondary"
                          className="gap-2 whitespace-nowrap"
                        >
                          <span>View Details</span>
                          <ArrowRight className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
