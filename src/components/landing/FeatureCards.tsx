const features = [
  "Admin-reviewed RFQs",
  "3-5 shortlisted vendors",
  "Structured quotations",
  "Vendor verification",
  "Project tracking",
  "Payment visibility"
];

export function FeatureCards() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="page-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div className="sticky top-24 grid gap-4">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Why RKISPro</p>
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">Built for industrial buying, not generic lead generation.</h2>
          <p className="text-muted">RKISPro keeps requirements structured, vendors verified, and admin review in the loop so industrial buyers can compare execution fit with more confidence.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div className="rounded-lg border border-line bg-canvas p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft" key={feature}>
              <span className="block h-1 w-12 rounded-full bg-brand-gold" />
              <h3 className="mt-5 font-black text-slate-950">{feature}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">A managed procurement coordination layer for RFQs, quotations, approvals, vendor shortlisting, and execution tracking.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
