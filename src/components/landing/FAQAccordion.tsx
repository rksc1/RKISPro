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
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="page-shell grid gap-8 lg:grid-cols-[.7fr_1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">FAQ</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-slate-900">Questions industrial teams ask first.</h2>
        </div>
        <div className="grid gap-3">
          {faqs.map(([question, answer]) => (
            <details className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 open:border-teal-500/40" key={question}>
              <summary className="cursor-pointer list-none font-bold text-slate-900 transition-colors hover:text-teal-700">{question}</summary>
              <p className="mt-3 text-sm leading-6 text-slate-600 border-t border-slate-100 pt-3">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
