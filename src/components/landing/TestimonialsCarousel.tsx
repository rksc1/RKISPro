const testimonials = [
  {
    quote: "RKISPro helped us shortlist capable fabricators without calling twenty people manually.",
    name: "Procurement Head",
    company: "Packaging Machinery Manufacturer"
  },
  {
    quote: "The jobs are clearer than normal lead portals. We understand scope, location, and drawings upfront.",
    name: "Owner",
    company: "Precision Fabrication Unit"
  },
  {
    quote: "For maintenance jobs, local contractor matching saves real time. The workflow feels built for industrial teams.",
    name: "Plant Manager",
    company: "Auto Components Factory"
  }
];

export function TestimonialsCarousel() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="page-shell grid gap-10">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">Trusted by Industrial Teams</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Built for buyers and contractors who need clarity.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm flex flex-col justify-between" key={item.company}>
              <div>
                <div className="flex gap-1 text-amber-500" aria-label="5 star rating">
                  {"★★★★★"}
                </div>
                <blockquote className="mt-4 text-base font-medium leading-relaxed text-slate-800">&quot;{item.quote}&quot;</blockquote>
              </div>
              <figcaption className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                <strong className="block text-slate-900 font-bold mb-0.5">{item.name}</strong>
                {item.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
