const openMarketplaceItems = [
  "Unlimited vendors",
  "Inconsistent quotations",
  "Price-first bidding",
  "Limited execution visibility",
  "No procurement coordination"
];

const rkisproItems = [
  "Expert-reviewed jobs",
  "3-5 matched contractors",
  "Comparable price quotes",
  "Contractor verification",
  "Project/payment tracking",
  "Managed coordination"
];

export function ManagedVsOpenMarketplaces() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="page-shell grid gap-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-500">Procurement Coordination</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-white sm:text-4xl">Managed, Not Open Bidding</h2>
          <p className="mt-4 text-navy-100 leading-relaxed">
            Industrial projects fail when contractors are selected only on price. RKISPro focuses on execution fit, capability, reliability, and clarity.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="bento-card">
            <h3 className="font-display text-xl font-bold text-white/80">Open Marketplaces</h3>
            <div className="mt-5 grid gap-3">
              {openMarketplaceItems.map((item) => (
                <span className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-medium text-navy-100/60" key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="bento-card" style={{ border: "1px solid rgba(0, 196, 204, 0.4)", background: "rgba(0, 196, 204, 0.05)" }}>
            <h3 className="font-display text-xl font-bold text-teal-400">RKISPro</h3>
            <div className="mt-5 grid gap-3">
              {rkisproItems.map((item) => (
                <span className="rounded-xl bg-teal-500/10 border border-teal-500/20 px-4 py-3 text-sm font-bold text-white" key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
