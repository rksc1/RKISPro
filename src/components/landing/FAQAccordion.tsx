const faqs = [
  ["How does RKISPro work?", "Customers post jobs, admins review requirements, matched contractors receive them, and contractors submit price quotes."],
  ["Is contractor verification available?", "Yes. Contractor profiles, machinery, and capabilities are reviewed and approved before receiving jobs."],
  ["How fast can I get quotes?", "Response time depends on category and location, but structured job details help contractors respond faster."],
  ["Is RKISPro available in all cities?", "The platform is designed for local and nationwide contractor discovery across industrial clusters."],
  ["How do contractors receive leads?", "Verified contractors receive jobs matched by admins based on location, services, machinery, and capacity."],
  ["Are payments secure?", "Payment workflows are planned as part of the later transaction layer. The current foundation focuses on matching and quote flows."]
];

export function FAQAccordion() {
  return (
    <section className="py-20">
      <div className="page-shell grid gap-8 lg:grid-cols-[.7fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-500">FAQ</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-white">Questions industrial teams ask first.</h2>
        </div>
        <div className="grid gap-3">
          {faqs.map(([question, answer]) => (
            <details className="bento-card group transition-all duration-300 open:border-teal-500/30 open:bg-white/[0.04]" key={question}>
              <summary className="cursor-pointer list-none font-bold text-white transition-colors group-hover:text-teal-400">{question}</summary>
              <p className="mt-4 text-sm leading-6 text-navy-100">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
