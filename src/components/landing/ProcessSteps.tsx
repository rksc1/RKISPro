const steps = [
  { step: "01", title: "Post Requirement", body: "Share drawings, material details, deadline, and job location." },
  { step: "02", title: "Receive Quotes", body: "Approved vendors receive RFQs and respond with structured quotations." },
  { step: "03", title: "Compare Vendors", body: "Review pricing, timeline, capabilities, location, and vendor profile." },
  { step: "04", title: "Hire & Complete Work", body: "Select the best-fit industrial partner and track the job lifecycle." }
];

export function ProcessSteps() {
  return (
    <section className="bg-white py-20">
      <div className="page-shell grid gap-10">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">How RKISPro Works</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">From requirement to verified vendor in a clean workflow.</h2>
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
