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
    <section className="py-20">
      <div className="page-shell grid gap-10">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-500">Trusted by Industrial Teams</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-white sm:text-4xl">Built for buyers and contractors who need clarity.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure className="bento-card flex flex-col" key={item.company}>
              <div className="flex gap-1 text-amber-500" aria-label="5 star rating">
                {"★★★★★"}
              </div>
              <blockquote className="mt-6 text-lg font-medium leading-relaxed text-white">&quot;{item.quote}&quot;</blockquote>
              <figcaption className="mt-auto pt-6 text-sm text-navy-100">
                <strong className="block text-teal-400 font-bold mb-0.5">{item.name}</strong>
                {item.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
