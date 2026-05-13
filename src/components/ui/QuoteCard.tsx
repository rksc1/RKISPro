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
  const recommendationLabel = quote.isRecommended
    ? "Recommended Vendor"
    : quote.executionFitScore && quote.executionFitScore >= 80
      ? "Best Execution Fit"
      : null;

  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-950">{quote.request?.projectTitle ?? quote.vendor?.companyName ?? "Vendor quote"}</h2>
            <p className="mt-1 text-sm text-muted">
              {quote.request?.serviceType ?? quote.vendor?.services} | {quote.request?.location ?? location}
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {recommendationLabel ? (
              <span className="w-max rounded-full bg-brand-gold px-2.5 py-1 text-xs font-black text-slate-950">{recommendationLabel}</span>
            ) : null}
            <QuoteStatusBadge status={quote.status} />
          </div>
        </div>
        <div className="grid gap-2 text-sm md:grid-cols-3">
          <span><strong>Vendor:</strong> {quote.vendor?.companyName ?? "Vendor"}</span>
          <span><strong>Quote amount:</strong> INR {Number(quote.amount).toLocaleString("en-IN")}</span>
          <span><strong>Timeline:</strong> {quote.timeline}</span>
          <span><strong>Vendor capability:</strong> {quote.vendor?.services ?? "Under review"}</span>
          <span><strong>Vendor location:</strong> {location ?? "Under review"}</span>
          <span><strong>Machinery/capacity:</strong> {[quote.vendor?.machinery, quote.vendor?.capacity].filter(Boolean).join(" / ") || "Under review"}</span>
          <span><strong>Verification:</strong> {quote.vendor?.verificationStatus ?? "Under review"}</span>
          <span><strong>Execution fit:</strong> {quote.executionFitScore ? `${quote.executionFitScore}/100` : "Admin review pending"}</span>
          <span><strong>Risk indicators:</strong> {quote.riskNotes ?? "No admin risk notes"}</span>
        </div>
        {quote.adminNotes ? (
          <p className="rounded-md bg-canvas p-3 text-sm leading-6 text-muted"><strong>Admin review notes:</strong> {quote.adminNotes}</p>
        ) : null}
        <p className="text-sm leading-6 text-muted">{quote.notes}</p>
        {quote.attachmentUrl ? (
          <Button href={quote.attachmentUrl} variant="secondary">View Attachment</Button>
        ) : null}
        {footer}
      </div>
    </Card>
  );
}
