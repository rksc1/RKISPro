const stats = [
  { value: "12K+", label: "Verified Vendors", note: "Fabricators, machine shops, repair teams" },
  { value: "38K+", label: "RFQs Processed", note: "Across fabrication and industrial services" },
  { value: "120+", label: "Cities Served", note: "Local clusters and nationwide vendors" },
  { value: "91%", label: "Response Rate", note: "Structured RFQs routed to matched vendors" }
];

export function StatsSection() {
  return (
    <section className="bg-canvas py-14">
      <div className="page-shell grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div className="group rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-brand-gold" key={stat.label}>
            <strong className="text-3xl font-black text-slate-950">{stat.value}</strong>
            <h3 className="mt-2 font-bold">{stat.label}</h3>
            <p className="mt-2 text-sm text-muted">{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
