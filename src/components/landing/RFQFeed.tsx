const rfqs = [
  { title: "MS structure fabrication for factory mezzanine", category: "Steel Fabrication", location: "Pune", budget: "₹4.5L - ₹6L", time: "18 min ago" },
  { title: "CNC machining for aluminium housings", category: "CNC Machining", location: "Bengaluru", budget: "₹80K - ₹1.2L", time: "42 min ago" },
  { title: "Industrial shed roofing and column work", category: "Shed Construction", location: "Ahmedabad", budget: "₹9L+", time: "1 hr ago" },
  { title: "Lathe work for stainless steel shafts", category: "Lathe Work", location: "Coimbatore", budget: "Quote needed", time: "2 hrs ago" }
];

export function RFQFeed() {
  return (
    <section className="bg-white py-20">
      <div className="page-shell grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Live Requirements</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Recent RFQs from industrial buyers.</h2>
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
                <p className="mt-2 text-sm text-muted">{rfq.category} | {rfq.location} | {rfq.time}</p>
              </div>
              <span className="h-max rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-brand-gold">{rfq.budget}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
