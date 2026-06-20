import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuoteStatusBadge } from "@/components/ui/QuoteStatusBadge";
import type { VendorQuote } from "@/models/VendorQuote";
import type { ReactNode } from "react";

type QuoteCardProps = {
  quote: VendorQuote & {
    vendor?: {
      companyName: string;
      ownerName: string;
      location: string;
      services: string;
      machinery?: string;
      capacity?: string;
      verificationStatus?: string;
      city?: string | null;
      state?: string | null;
    } | null;
    request?: {
      projectTitle: string;
      serviceType: string;
      location: string;
    } | null;
  };
  footer?: ReactNode;
};

export function QuoteCard({ quote, footer }: QuoteCardProps) {
  const location = [quote.vendor?.city, quote.vendor?.state].filter(Boolean).join(", ") || quote.vendor?.location;
  const executionFitLabel = quote.executionFitScore ? `${quote.executionFitScore}/100` : "Admin review pending";
  const riskLabel = quote.riskNotes ?? "No admin risk notes";
  const recommendationLabel = quote.isRecommended
    ? "Recommended Vendor"
    : quote.executionFitScore && quote.executionFitScore >= 80
      ? "Best Execution Fit"
      : null;

  return (
    <Card className={quote.isRecommended ? "border-brand-gold" : ""}>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-slate-950">{quote.vendor?.companyName ?? "Vendor quote"}</h2>
              <a href={`/customer/vendors/${quote.vendorId}`} target="_blank" className="text-sm font-bold text-brand hover:underline">
                View Profile &rarr;
              </a>
            </div>
            <p className="mt-1 text-sm text-muted">
              {quote.vendor?.services ?? quote.request?.serviceType ?? "Industrial service"} | {location ?? quote.request?.location ?? "Location under review"}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {recommendationLabel ? (
              <span className="w-max rounded-full bg-brand-gold px-2.5 py-1 text-xs font-black text-slate-950">{recommendationLabel}</span>
            ) : null}
            <QuoteStatusBadge status={quote.status} />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-lg border border-line bg-canvas p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Execution fit</span>
            <strong className="mt-1 block text-lg text-slate-950">{executionFitLabel}</strong>
          </div>
          <div className="rounded-lg border border-line bg-canvas p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Delivery timeline</span>
            <strong className="mt-1 block text-lg text-slate-950">{quote.timeline}</strong>
          </div>
          <div className="rounded-lg border border-line bg-canvas p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Verification</span>
            <strong className="mt-1 block text-lg text-slate-950">{quote.vendor?.verificationStatus ?? "Under review"}</strong>
          </div>
          <div className="rounded-lg border border-line bg-white p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Quote amount</span>
            <strong className="mt-1 block text-base text-slate-800">INR {Number(quote.amount).toLocaleString("en-IN")}</strong>
          </div>
        </div>
        <div className="grid gap-2 text-sm md:grid-cols-2">
          <span><strong>Vendor capability:</strong> {quote.vendor?.services ?? "Under review"}</span>
          <span><strong>Machinery/capacity:</strong> {[quote.vendor?.machinery, quote.vendor?.capacity].filter(Boolean).join(" / ") || "Under review"}</span>
          <span><strong>Vendor location:</strong> {location ?? "Under review"}</span>
          <span><strong>Risk indicators:</strong> {riskLabel}</span>
        </div>
        {quote.adminNotes ? (
          <p className="rounded-md bg-canvas p-3 text-sm leading-6 text-muted"><strong>Admin review notes:</strong> {quote.adminNotes}</p>
        ) : null}
        <p className="rounded-md border border-line bg-white p-3 text-sm leading-6 text-muted"><strong>Vendor notes:</strong> {quote.notes}</p>
        {quote.attachmentUrl ? (
          <Button href={quote.attachmentUrl} variant="secondary">View Attachment</Button>
        ) : null}
        {footer}
      </div>
    </Card>
  );
}
