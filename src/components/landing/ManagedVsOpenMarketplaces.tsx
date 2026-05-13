const openMarketplaceItems = [
  "Unlimited vendors",
  "Inconsistent quotations",
  "Price-first bidding",
  "Limited execution visibility",
  "No procurement coordination"
];

const rkisproItems = [
  "Admin-reviewed RFQs",
  "3-5 shortlisted vendors",
  "Structured quotations",
  "Vendor verification",
  "Project/payment tracking",
  "Managed coordination"
];

export function ManagedVsOpenMarketplaces() {
  return (
    <section className="bg-canvas py-20">
      <div className="page-shell grid gap-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Procurement Coordination</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Managed, Not Open Bidding</h2>
          <p className="mt-4 text-muted">
            Industrial projects fail when vendors are selected only on price. RKISPro focuses on execution fit, capability, reliability, and procurement clarity.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="text-xl font-black text-slate-950">Open Marketplaces</h3>
            <div className="mt-5 grid gap-3">
              {openMarketplaceItems.map((item) => (
                <span className="rounded-xl bg-canvas px-4 py-3 text-sm font-bold text-muted" key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-brand-gold bg-slate-950 p-6 text-white">
            <h3 className="text-xl font-black">RKISPro</h3>
            <div className="mt-5 grid gap-3">
              {rkisproItems.map((item) => (
                <span className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-slate-100" key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
