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
    <section className="bg-slate-950 py-20 text-white">
      <div className="page-shell grid gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Industrial Service Categories</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Find verified vendors for fabrication, machining, repair, maintenance, and shop-floor execution requirements.</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <a
              className="group min-h-36 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-brand-gold hover:bg-white/[0.1]"
              href="/customer/request/new"
              key={category}
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-gold text-sm font-black text-slate-950">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-black">{category}</h3>
              <p className="mt-2 text-xs text-slate-400">Post Requirement</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
