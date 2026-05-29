const matchingFactors = [
  "Capability fit",
  "Location",
  "Machinery/capacity",
  "Timeline readiness",
  "Verification status",
  "Reliability"
];

export function VendorMatchingSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="page-shell grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div className="grid gap-4">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-gold">Vendor Shortlisting</p>
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">How Vendor Matching Works</h2>
          <p className="text-muted">
            RKISPro shortlists vendors based on fabrication capability, machinery/capacity, location, project type, prior reliability, timeline capability, and verification status.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {matchingFactors.map((factor) => (
            <div className="rounded-lg border border-line bg-canvas p-5" key={factor}>
              <span className="block h-1 w-12 rounded-full bg-brand-gold" />
              <h3 className="mt-5 font-black text-slate-950">{factor}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Reviewed before an RFQ is shared with a shortlisted vendor.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
