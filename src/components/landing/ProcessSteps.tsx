const steps = [
  { step: "01", title: "Start Managed RFQ", body: "Share drawings, material details, deadline, quality needs, and site location." },
  { step: "02", title: "Admin Review", body: "RKISPro reviews scope and prepares the requirement for the right vendor category." },
  { step: "03", title: "Vendor Shortlisting", body: "3-5 verified vendors are matched by capability, machinery, location, timeline, and reliability." },
  { step: "04", title: "Award & Track", body: "Compare structured quotations, select an execution-fit vendor, and track delivery through completion." }
];

export function ProcessSteps() {
  return (
    <section className="bg-white py-20">
      <div className="page-shell grid gap-10">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">How RKISPro Works</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">From industrial requirement to coordinated execution.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {steps.map((item) => (
            <div className="relative rounded-2xl border border-line bg-canvas p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft" key={item.step}>
              <span className="grid size-12 place-items-center rounded-xl bg-slate-950 text-sm font-black text-brand-gold">{item.step}</span>
              <h3 className="mt-5 text-lg font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
