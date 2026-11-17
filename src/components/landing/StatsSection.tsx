const stats = [
  { value: "12K+", label: "Verified Contractors", note: "Fabricators, machine shops, repair teams" },
  { value: "38K+", label: "Jobs Processed", note: "Across fabrication and industrial services" },
  { value: "120+", label: "Cities Served", note: "Local clusters and nationwide contractors" },
  { value: "91%", label: "Response Rate", note: "Structured jobs routed to matched contractors" }
];

export function StatsSection() {
  return (
    <section className="py-14 bg-white border-y border-slate-200">
      <div className="page-shell grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:border-teal-500/40" key={stat.label}>
            <strong className="font-display text-4xl font-extrabold text-slate-900">{stat.value}</strong>
            <h3 className="mt-2 text-sm font-bold text-teal-700">{stat.label}</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
