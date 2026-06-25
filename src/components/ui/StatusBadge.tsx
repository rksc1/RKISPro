import type { MarketplaceRequestStatus, VendorStatus } from "@/types/auth";

type Status = VendorStatus | MarketplaceRequestStatus;

const classes: Record<Status, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Approved: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-800",
  Inactive: "bg-slate-200 text-slate-700",
  Distributed: "bg-blue-100 text-blue-800",
  quotes_ready: "bg-fuchsia-100 text-fuchsia-800",
  awarded: "bg-indigo-100 text-indigo-800"
};

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`w-max rounded-full px-2.5 py-1 text-xs font-bold ${classes[status]}`}>{status}</span>;
}
