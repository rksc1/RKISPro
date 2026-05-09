import { AmountDisplay } from "@/components/ui/AmountDisplay";
import { Card } from "@/components/ui/Card";
import { PaymentStatusBadge } from "@/components/ui/PaymentStatusBadge";
import type { Payment } from "@/models/Payment";
import type { ReactNode } from "react";

export function PaymentCard({ payment, actions }: { payment: Payment; actions?: ReactNode }) {
  return (
    <Card>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">{payment.paymentDirection.replaceAll("_", " ")}</p>
            <h3 className="mt-1 text-xl font-black capitalize text-slate-950">{payment.paymentType} payment</h3>
          </div>
          <PaymentStatusBadge status={payment.status} />
        </div>
        <div className="grid gap-2 text-sm md:grid-cols-4">
          <span><strong>Amount:</strong> <AmountDisplay amount={payment.amount} /></span>
          <span><strong>Method:</strong> {payment.paymentMethod ?? "Not set"}</span>
          <span><strong>Reference:</strong> {payment.referenceNumber ?? "Not set"}</span>
          <span><strong>Paid at:</strong> {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString("en-IN") : "Not paid"}</span>
          <span><strong>Razorpay order:</strong> {payment.razorpayOrderId ?? "Not set"}</span>
          <span><strong>Razorpay payment:</strong> {payment.razorpayPaymentId ?? "Not set"}</span>
          <span><strong>Gateway status:</strong> {payment.razorpayStatus ?? "Not set"}</span>
          <span><strong>Failure:</strong> {payment.failureReason ?? "None"}</span>
        </div>
        {payment.notes ? <p className="rounded-md bg-canvas p-3 text-sm text-muted">{payment.notes}</p> : null}
        {actions}
      </div>
    </Card>
  );
}
