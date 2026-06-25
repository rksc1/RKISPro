import { notFound } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuoteCard } from "@/components/ui/QuoteCard";
import { getCustomerFromCookie } from "@/lib/auth";
import { getApprovedQuotesForCustomerRequest } from "@/services/vendor-quote-service";

export const dynamic = "force-dynamic";

export default async function CustomerQuoteComparisonPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, customer] = await Promise.all([params, getCustomerFromCookie()]);

  if (!customer) notFound();

  const { request, quotes } = await getApprovedQuotesForCustomerRequest(id, customer.id);

  if (!request) notFound();

  return (
    <CustomerLayout title="Compare structured quotations">
      <Card>
        <div className="grid gap-3">
          <h2 className="text-2xl font-black text-slate-950">{request.project_title}</h2>
          <p className="text-sm text-muted">{request.description}</p>
          <div className="grid gap-2 text-sm md:grid-cols-4">
            <span><strong>Service:</strong> {request.service_type}</span>
            <span><strong>Material:</strong> {request.material_type}</span>
            <span><strong>Location:</strong> {request.location}</span>
            <span><strong>Deadline:</strong> {request.deadline}</span>
          </div>
          <p className="text-sm text-muted">
            Review amount alongside delivery timeline, vendor capability, verification status, admin notes, and execution risk before awarding.
          </p>
          <div className="grid gap-3 pt-2 md:grid-cols-3">
            <div className="rounded-lg border border-line bg-canvas p-4">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">Comparison priority</span>
              <strong className="mt-1 block text-slate-950">Execution fit first</strong>
            </div>
            <div className="rounded-lg border border-line bg-canvas p-4">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">Approved quotations</span>
              <strong className="mt-1 block text-slate-950">{quotes.length}</strong>
            </div>
            <div className="rounded-lg border border-line bg-canvas p-4">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">Decision support</span>
              <strong className="mt-1 block text-slate-950">Timeline, capability, risk</strong>
            </div>
          </div>
        </div>
      </Card>

      {quotes.length === 0 ? (
        <EmptyState
          title="Quotes are under review"
          description="RKISPro is reviewing vendor submissions. Approved structured quotations will appear here with capability, timeline, verification, and execution-risk context."
        />
      ) : (
        <div className="grid gap-4">
          {quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              footer={
                request.status === "quotes_ready" ? (
                  <ConfirmDialog
                    title="Award to this vendor?"
                    description="This will award the project to the selected vendor and mark other approved quotations as not selected."
                    actionLabel="Award Vendor"
                  >
                    <form action={`/api/customer/requests/${request.id}/select-vendor`} method="post">
                      <input type="hidden" name="quoteId" value={quote.id} />
                      <Button type="submit">Confirm Award</Button>
                    </form>
                  </ConfirmDialog>
                ) : (
                  <div className="rounded-md border border-line bg-canvas p-3 text-sm font-semibold text-muted text-center">
                    RKISPro is finalising quotations for comparison. You&apos;ll be notified when ready.
                  </div>
                )
              }
            />
          ))}
        </div>
      )}
    </CustomerLayout>
  );
}
