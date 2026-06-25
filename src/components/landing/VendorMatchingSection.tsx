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
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="page-shell grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div className="grid gap-4">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-500">Contractor Matching</p>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">How Matching Works</h2>
          <p className="text-navy-100 leading-relaxed">
            RKISPro matches contractors based on fabrication capability, machinery/capacity, location, project type, prior reliability, timeline capability, and verification status.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {matchingFactors.map((factor) => (
            <div className="bento-card" key={factor}>
              <span className="block h-1 w-12 rounded-full bg-teal-500" />
              <h3 className="mt-4 font-bold text-white">{factor}</h3>
              <p className="mt-2 text-sm leading-6 text-navy-100/80">Reviewed before a job is shared with a matched contractor.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
