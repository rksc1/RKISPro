const faqs = [
  ["How does RKISPro work?", "Customers post requirements, admins review RFQs, approved vendors receive them, and vendors submit quotations."],
  ["Is vendor verification available?", "Yes. Vendor profiles can be reviewed and approved before receiving RFQs."],
  ["How fast can I get quotations?", "Response time depends on category and location, but structured RFQs help vendors respond faster."],
  ["Is RKISPro available in all cities?", "The platform is designed for local and nationwide vendor discovery across industrial clusters."],
  ["How do vendors receive leads?", "Approved vendors receive RFQs distributed by admins based on location, services, machinery, and capacity."],
  ["Are payments secure?", "Payment workflows are planned as part of the later transaction layer. The current foundation focuses on RFQ and quotation flow."]
];

export function FAQAccordion() {
  return (
    <section className="bg-white py-20">
      <div className="page-shell grid gap-8 lg:grid-cols-[.7fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">FAQ</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">Questions industrial teams ask first.</h2>
        </div>
        <div className="grid gap-3">
          {faqs.map(([question, answer]) => (
            <details className="group rounded-2xl border border-line bg-canvas p-5 open:bg-white open:shadow-soft" key={question}>
              <summary className="cursor-pointer list-none font-black text-slate-950">{question}</summary>
              <p className="mt-3 text-sm leading-6 text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
