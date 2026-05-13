const trustItems = [
  "GST/PAN support",
  "Workshop verification",
  "Category approval",
  "RFQ review checklist",
  "Technical document handling",
  "Milestone tracking",
  "Payment visibility",
  "Admin coordination"
];

export function TrustWorkflowSection() {
  return (
    <section className="bg-canvas py-20">
      <div className="page-shell grid gap-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Trust Workflow</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Built for Industrial Trust</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div className="rounded-2xl border border-line bg-white p-5" key={item}>
              <h3 className="font-black text-slate-950">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Part of the managed RFQ and execution coordination workflow.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
