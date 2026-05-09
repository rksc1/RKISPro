import type { PaymentStatus } from "@/types/auth";

const styles: Record<PaymentStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  failed: "bg-red-50 text-red-700 ring-red-200",
  refunded: "bg-blue-50 text-blue-700 ring-blue-200"
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ring-1 ${styles[status]}`}>
      {status}
    </span>
  );
}
