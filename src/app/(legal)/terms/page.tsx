import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | RKISPro Marketplace",
  description: "Terms and Conditions governing the use of RKISPro pvt Ltd's marketplace services.",
};

export default function TermsPage() {
  const lastUpdated = "June 25, 2026";

  return (
    <div className="grid gap-8">
      <header className="border-b border-white/10 pb-8">
        <h1 className="font-display text-3xl font-extrabold text-white">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-navy-100">Last updated: {lastUpdated}</p>
      </header>

      <div className="prose-legal">
        <section className="grid gap-4">
          <p className="text-sm leading-relaxed text-navy-100/80">
            Welcome to RKISPro. These Terms & Conditions (&quot;Terms&quot;) govern your access to and use of the marketplace platform operated by RKISPro pvt Ltd (&quot;RKISPro&quot;, &quot;we&quot;, &quot;us&quot;). By registering or using the Platform, you agree to be bound by these Terms.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">1. Platform Role</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            RKISPro acts strictly as a marketplace facilitator connecting industrial buyers with verified contractors for fabrication, machining, and repair jobs. We are not a party to the manufacturing contract, purchase order, or service agreement executed between the buyer and the contractor.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">2. User Accounts & Verification</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            To use the Platform, you must register as a Buyer or Contractor. You agree to provide accurate and current business information (including GSTIN/PAN). Contractors are subject to a verification process regarding capabilities and workshop status. RKISPro reserves the right to suspend or terminate accounts providing false or misleading information.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">3. Job Postings & Quotations</h2>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-navy-100/80 space-y-2">
            <li><strong>Buyers:</strong> Must provide clear, legal, and accurate job specifications, drawings, and timelines.</li>
            <li><strong>Contractors:</strong> Must submit accurate, good-faith quotations. Quotations become binding commercial offers upon acceptance by the Buyer.</li>
            <li>RKISPro does not guarantee the accuracy of drawings submitted by buyers, nor the final quality of goods delivered by contractors.</li>
          </ul>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">4. Confidentiality</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            Users agree to treat all technical drawings, specifications, and pricing shared through the Platform as confidential. You may only use this information for the purpose of evaluating or executing the specific job it was shared for.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">5. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            RKISPro pvt Ltd shall not be liable for any indirect, incidental, or consequential damages arising out of the use of the Platform. Disputes regarding product quality, payment delays, or execution timelines are solely between the Buyer and the Contractor.
          </p>
        </section>

        <section className="grid gap-4 mt-8">
          <h2 className="font-display text-xl font-bold text-white">6. Governing Law</h2>
          <p className="text-sm leading-relaxed text-navy-100/80">
            These Terms are governed by the laws of India. Any disputes relating to Platform usage shall be subject to the exclusive jurisdiction of the courts located in India.
          </p>
        </section>
      </div>
    </div>
  );
}
