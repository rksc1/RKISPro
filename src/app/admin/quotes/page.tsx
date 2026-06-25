import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { QuoteCard } from "@/components/ui/QuoteCard";
import { getAdminVendorQuotes } from "@/services/vendor-quote-service";
import type { VendorQuoteStatus } from "@/types/auth";

export const dynamic = "force-dynamic";

function isQuoteStatus(value?: string): value is VendorQuoteStatus {
  return value === "pending" || value === "approved" || value === "rejected" || value === "selected" || value === "not_selected";
}

export default async function AdminQuotesPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const filters = await searchParams;
  const status = isQuoteStatus(filters.status) ? filters.status : "";
  const quotes = await getAdminVendorQuotes(status);

  return (
    <AdminLayout title="Quote review">
      <Card>
        <form className="grid gap-4 md:grid-cols-[1fr_auto]" action="/admin/quotes">
          <label className="grid gap-1.5 text-sm font-semibold text-ink" htmlFor="status">
            Status
            <select
              className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-normal outline-none focus:border-brand"
              defaultValue={status}
              id="status"
              name="status"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="selected">Selected</option>
              <option value="not_selected">Not selected</option>
            </select>
          </label>
          <div className="flex items-end">
            <Button type="submit">Filter</Button>
          </div>
        </form>
      </Card>
      <div className="grid gap-4">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            footer={
              <div className="grid gap-3 border-t border-line pt-4">
                <div className="grid gap-1 text-sm text-muted md:grid-cols-3">
                  <span>Created: {new Date(quote.createdAt).toLocaleDateString()}</span>
                  <span>Customer location: {quote.request?.location ?? "N/A"}</span>
                  <span>Vendor: {quote.vendor?.companyName ?? "N/A"}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <form className="flex gap-2" action={`/api/admin/quotes/${quote.id}/status`} method="post">
                    <input type="hidden" name="status" value="approved" />
                    <Button type="submit">Approve</Button>
                  </form>
                  <form className="flex gap-2" action={`/api/admin/quotes/${quote.id}/status`} method="post">
                    <input type="hidden" name="status" value="approved" />
                    <input type="hidden" name="quotesReady" value="true" />
                    <Button type="submit" variant="secondary">Approve & Mark Comparison Ready</Button>
                  </form>
                  <form className="flex flex-wrap gap-2" action={`/api/admin/quotes/${quote.id}/status`} method="post">
                    <input type="hidden" name="status" value="rejected" />
                    <Input label="Admin notes" name="adminNotes" placeholder="Optional reason" />
                    <div className="flex items-end">
                      <Button type="submit" variant="danger">Reject</Button>
                    </div>
                  </form>
                </div>
              </div>
            }
          />
        ))}
        {quotes.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">No quotes match the selected filter.</p>
          </Card>
        ) : null}
      </div>
    </AdminLayout>
  );
}
