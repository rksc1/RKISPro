const trustItems = [
  { title: "GST/PAN support", body: "Capture tax and business documentation needs early in the procurement flow." },
  { title: "Workshop verification", body: "Help buyers understand whether a vendor has real shop-floor capability." },
  { title: "Category approval", body: "Vendors are aligned to approved fabrication, machining, repair, and service categories." },
  { title: "Job review checklist", body: "Admin review keeps scope, drawings, materials, quality, and timeline clear before sharing." },
  { title: "Technical document handling", body: "Drawings and supporting files stay connected to the managed requirement." },
  { title: "Milestone tracking", body: "Execution can be followed through checkpoints instead of ending at vendor selection." },
  { title: "Payment visibility", body: "Project payment state stays visible after award and during coordination." },
  { title: "Admin coordination", body: "RKISPro keeps review, shortlist, quotation comparison, award, and tracking connected." }
];

export function TrustWorkflowSection() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="page-shell grid gap-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-500">Trust Workflow</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-white sm:text-4xl">Built for Industrial Trust</h2>
          <p className="mt-3 text-sm leading-6 text-navy-100">The platform is designed around procurement clarity, vendor verification, and execution follow-through.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div className="bento-card" key={item.title}>
              <h3 className="font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-navy-100/80">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
