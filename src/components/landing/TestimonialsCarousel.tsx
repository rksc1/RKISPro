const testimonials = [
  {
    quote: "RKISPro helped us shortlist capable fabricators without calling twenty vendors manually.",
    name: "Procurement Head",
    company: "Packaging Machinery Manufacturer"
  },
  {
    quote: "The RFQs are clearer than normal marketplace leads. We understand scope, location, and drawings upfront.",
    name: "Owner",
    company: "Precision Fabrication Unit"
  },
  {
    quote: "For maintenance jobs, local vendor matching saves real time. The workflow feels built for industrial teams.",
    name: "Plant Manager",
    company: "Auto Components Factory"
  }
];

export function TestimonialsCarousel() {
  return (
    <section className="bg-canvas py-20">
      <div className="page-shell grid gap-10">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Trusted by Industrial Teams</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Built for buyers and vendors who need clarity.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure className="rounded-2xl border border-line bg-white p-6 shadow-soft" key={item.company}>
              <div className="flex gap-1 text-brand-gold" aria-label="5 star rating">
                {"★★★★★"}
              </div>
              <blockquote className="mt-5 text-lg font-bold leading-8 text-slate-950">&quot;{item.quote}&quot;</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <strong className="block text-ink">{item.name}</strong>
                {item.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
