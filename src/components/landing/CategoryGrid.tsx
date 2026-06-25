const categories = [
  "Steel Fabrication",
  "Welding Services",
  "CNC Machining",
  "Industrial Repair",
  "Shed Construction",
  "Lathe Work",
  "Machine Manufacturing",
  "Heavy Fabrication",
  "Powder Coating",
  "Industrial Maintenance"
];

export function CategoryGrid() {
  return (
    <section className="py-14 sm:py-16 lg:py-20" style={{ background: "#020D14" }}>
      <div className="page-shell grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-500">Industrial Service Categories</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-white sm:text-4xl">Find verified contractors for fabrication, machining, repair, maintenance, and shop-floor execution requirements.</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <a
              className="bento-card group min-h-32 flex flex-col transition hover:-translate-y-1 hover:border-teal-500/40 hover:bg-white/[0.04]"
              href="/customer/request/new"
              key={category}
            >
              <span className="grid size-10 place-items-center rounded-lg bg-teal-500/10 text-xs font-bold text-teal-400 border border-teal-500/20">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-auto font-bold text-white text-base">{category}</h3>
              <p className="mt-1 text-xs text-navy-100/60">Post Your Job</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
