const stats = [
  { value: "12K+", label: "Verified Contractors", note: "Fabricators, machine shops, repair teams" },
  { value: "38K+", label: "Jobs Processed", note: "Across fabrication and industrial services" },
  { value: "120+", label: "Cities Served", note: "Local clusters and nationwide contractors" },
  { value: "91%", label: "Response Rate", note: "Structured jobs routed to matched contractors" }
];

export function StatsSection() {
  return (
    <section className="py-14">
      <div className="page-shell grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div className="bento-card group transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:bg-white/[0.04]" key={stat.label}>
            <strong className="font-display text-4xl font-extrabold text-white">{stat.value}</strong>
            <h3 className="mt-3 font-bold text-teal-400">{stat.label}</h3>
            <p className="mt-2 text-sm text-navy-100/80 leading-relaxed">{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
