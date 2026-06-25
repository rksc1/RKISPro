const rfqs = [
  { title: "MS structure fabrication for factory mezzanine", category: "Steel Fabrication", location: "Pune", shortlist: "4 contractors matched", timeline: "3 week delivery", stage: "Contractor shortlist prepared" },
  { title: "CNC machining for aluminium housings", category: "CNC Machining", location: "Bengaluru", shortlist: "3 contractors matched", timeline: "Batch delivery review", stage: "Quote review" },
  { title: "Industrial shed roofing and column work", category: "Shed Construction", location: "Ahmedabad", shortlist: "5 contractors matched", timeline: "Milestone tracking", stage: "Execution tracking" },
  { title: "Lathe work for stainless steel shafts", category: "Lathe Work", location: "Coimbatore", shortlist: "Scope under review", timeline: "Timeline being validated", stage: "Scope review" }
];

export function RFQFeed() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="page-shell grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-500">Managed Project Examples</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-white sm:text-4xl">Recent coordinated industrial projects.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-navy-100">Examples show structured coordination stages, not public bidding or lowest-price selection.</p>
          </div>
          <div className="hidden gap-2 md:flex">
            {["All", "Fabrication", "Machining", "Repair"].map((tab) => (
              <span className="rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-2 text-sm font-bold text-teal-400" key={tab}>{tab}</span>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {rfqs.map((rfq) => (
            <div className="bento-card grid gap-4 transition-all duration-300 hover:border-teal-500/30 hover:bg-white/[0.04] md:grid-cols-[1fr_auto]" key={rfq.title}>
              <div>
                <h3 className="font-display font-bold text-white text-lg">{rfq.title}</h3>
                <p className="mt-1 text-sm text-navy-100/80">{rfq.category} | {rfq.location}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-navy-100">{rfq.shortlist}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-navy-100">{rfq.timeline}</span>
                </div>
              </div>
              <span className="h-max rounded-full bg-teal-500/10 border border-teal-500/20 px-4 py-2 text-xs font-bold text-teal-400">{rfq.stage}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
