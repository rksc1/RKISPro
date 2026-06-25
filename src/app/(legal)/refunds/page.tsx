import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refunds & Cancellations | RKISPro Marketplace",
  description: "Refund and Cancellation policy for RKISPro pvt Ltd.",
};

export default function RefundsPage() {
  const lastUpdated = "June 25, 2026";

  return (
    <div className="grid gap-8">
      <header className="border-b border-white/10 pb-8">
        <h1 className="font-display text-3xl font-extrabold text-white">Refunds & Cancellations</h1>
        <p className="mt-2 text-sm text-navy-100">Last updated: {lastUpdated}</p>
      </header>

      <div className="prose-legal">
        <section className="grid gap-4">
          <p className="text-sm leading-relaxed text-navy-100/80">
            This Refunds & Cancellations Policy ("Policy") applies to the marketplace services provided by RKISPro pvt Ltd. Because RKISPro operates as a B2B facilitator matching buyers with industrial contractors, our policy reflects the nature of custom industrial execution.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">1. Platform Subscription Fees</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            Any subscription or platform access fees paid directly to RKISPro pvt Ltd (if applicable) are non-refundable unless the platform is unavailable for an extended, documented period due to technical failures on our end. Cancellations of subscriptions will take effect at the end of the current billing cycle.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">2. Job & Order Cancellations</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            Once a buyer accepts a quotation and awards a job to a contractor through the platform, the terms of cancellation are governed by the commercial agreement between the Buyer and the Contractor. Custom fabrication and machining jobs typically involve raw material procurement immediately upon order placement; therefore, full refunds are rarely feasible.
          </p>
          <p className="text-sm leading-relaxed text-navy-100/80 mt-2">
            RKISPro strongly advises contractors to clearly state their cancellation milestone terms (e.g., material cost deductions) in their submitted quotations.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">3. Payment Disputes</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            If a dispute arises regarding payment or refunds for an executed job, RKISPro will provide access to the platform's audit trail (milestones, uploaded drawings, communications) to assist both parties. However, RKISPro pvt Ltd does not hold funds in escrow and is not responsible for initiating refunds between users.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">4. Contacting Support</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            For issues related to platform billing errors, please contact us within 7 days of the transaction at:<br/><br/>
            <strong>Email:</strong> billing@rkispro.com
          </p>
        </section>
      </div>
    </div>
  );
}
