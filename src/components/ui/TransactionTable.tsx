import { AmountDisplay } from "@/components/ui/AmountDisplay";
import { EmptyState } from "@/components/ui/EmptyState";
import { PaymentStatusBadge } from "@/components/ui/PaymentStatusBadge";
import type { Payment } from "@/models/Payment";

export function TransactionTable({
  payments
}: {
  payments: Array<Payment & { project?: { title: string; customer: string; vendor: string } | null }>;
}) {
  if (payments.length === 0) {
    return <EmptyState title="No transactions yet" description="Payment and payout records will appear here once added." />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-line text-sm">
          <thead className="bg-canvas text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Direction</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Gateway</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-4 py-3">
                  <strong>{payment.project?.title ?? "Project"}</strong>
                  <p className="text-xs text-muted">{payment.project?.customer} / {payment.project?.vendor}</p>
                </td>
                <td className="px-4 py-3 capitalize">{payment.paymentType}</td>
                <td className="px-4 py-3">{payment.paymentDirection.replaceAll("_", " ")}</td>
                <td className="px-4 py-3 font-bold"><AmountDisplay amount={payment.amount} /></td>
                <td className="px-4 py-3"><PaymentStatusBadge status={payment.status} /></td>
                <td className="px-4 py-3">
                  <p>{payment.paymentMethod ?? "manual"}</p>
                  <p className="text-xs text-muted">{payment.razorpayPaymentId ?? payment.razorpayOrderId ?? "No gateway ID"}</p>
                </td>
                <td className="px-4 py-3">{new Date(payment.createdAt).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
