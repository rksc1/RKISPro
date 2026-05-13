import type { VendorQuoteStatus } from "@/types/auth";

const classes: Record<VendorQuoteStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  selected: "bg-blue-100 text-blue-800",
  not_selected: "bg-slate-200 text-slate-700"
};

export function QuoteStatusBadge({ status }: { status: VendorQuoteStatus }) {
  return (
    <span className={`w-max rounded-full px-2.5 py-1 text-xs font-bold ${classes[status]}`}>
      {status === "selected" ? "awarded" : status.replace("_", " ")}
    </span>
  );
}
