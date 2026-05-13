const rfqs = [
  { title: "MS structure fabrication for factory mezzanine", category: "Steel Fabrication", location: "Pune", stage: "Vendor shortlist prepared" },
  { title: "CNC machining for aluminium housings", category: "CNC Machining", location: "Bengaluru", stage: "Technical quotation review" },
  { title: "Industrial shed roofing and column work", category: "Shed Construction", location: "Ahmedabad", stage: "Execution tracking" },
  { title: "Lathe work for stainless steel shafts", category: "Lathe Work", location: "Coimbatore", stage: "Scope review" }
];

export function RFQFeed() {
  return (
    <section className="bg-white py-20">
      <div className="page-shell grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Managed RFQ Examples</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Recent coordinated industrial projects.</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            {["All", "Fabrication", "Machining", "Repair"].map((tab) => (
              <span className="rounded-full border border-line px-4 py-2 text-sm font-bold text-muted" key={tab}>{tab}</span>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {rfqs.map((rfq) => (
            <div className="grid gap-4 rounded-2xl border border-line bg-canvas p-5 transition hover:border-brand-gold hover:bg-white hover:shadow-soft md:grid-cols-[1fr_auto]" key={rfq.title}>
              <div>
                <h3 className="font-black text-slate-950">{rfq.title}</h3>
                <p className="mt-2 text-sm text-muted">{rfq.category} | {rfq.location}</p>
              </div>
              <span className="h-max rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-brand-gold">{rfq.stage}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
