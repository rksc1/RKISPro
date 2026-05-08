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
  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-950">{quote.request?.projectTitle ?? quote.vendor?.companyName ?? "Vendor quote"}</h2>
            <p className="mt-1 text-sm text-muted">
              {quote.request?.serviceType ?? quote.vendor?.services} | {quote.request?.location ?? quote.vendor?.location}
            </p>
          </div>
          <QuoteStatusBadge status={quote.status} />
        </div>
        <div className="grid gap-2 text-sm md:grid-cols-3">
          <span><strong>Vendor:</strong> {quote.vendor?.companyName ?? "Vendor"}</span>
          <span><strong>Amount:</strong> ₹{Number(quote.amount).toLocaleString("en-IN")}</span>
          <span><strong>Timeline:</strong> {quote.timeline}</span>
        </div>
        <p className="text-sm leading-6 text-muted">{quote.notes}</p>
        {quote.attachmentUrl ? (
          <Button href={quote.attachmentUrl} variant="secondary">View Attachment</Button>
        ) : null}
        {footer}
      </div>
    </Card>
  );
}
