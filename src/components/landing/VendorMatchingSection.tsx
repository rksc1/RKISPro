import {
  Maximize2,
  Zap,
  ShieldCheck,
  Compass,
  FileCheck,
  MapPin,
} from "lucide-react";

interface VettingProtocol {
  title: string;
  tag: string;
  icon: typeof Maximize2;
  description: string;
  criteria: string;
}

const protocols: VettingProtocol[] = [
  {
    title: "Machine Bed & Crane Tonnage",
    tag: "Physical Capacity",
    icon: Maximize2,
    description: "We audit machine bed travels (X/Y/Z), lathe swing clearance, and crane ratings against your CAD drawings before dispatching RFQs.",
    criteria: "Zero unapproved third-party subcontracting",
  },
  {
    title: "Connected Power & DG Backup",
    tag: "Uptime Assurance",
    icon: Zap,
    description: "Verified sanctioned industrial power load (kVA) and dedicated diesel generator backup to prevent thermal and delivery delays.",
    criteria: "Guaranteed uninterrupted run time",
  },
  {
    title: "Primary Mill Material Traceability",
    tag: "Metallurgy Integrity",
    icon: ShieldCheck,
    description: "Heat number tracking from primary mills (Tata, SAIL, Jindal) with raw material chemical composition and tensile test compliance.",
    criteria: "EN 10204 3.1 Mill Test Certificates",
  },
  {
    title: "NABL-Calibrated Metrology",
    tag: "Inspection Standard",
    icon: Compass,
    description: "Audit of precision inspection tools (CMM, bore gauges, height gauges) requiring active calibration records from NABL-accredited labs.",
    criteria: "Calibrated within preceding 12 months",
  },
  {
    title: "Active GSTIN & GSTR-3B Filings",
    tag: "Financial Compliance",
    icon: FileCheck,
    description: "Verification of tax compliance and solvency to guarantee 100% eligibility for buyers' Indian Goods & Services Input Tax Credit (ITC).",
    criteria: "Clean CBIC filing track record",
  },
  {
    title: "Industrial Cluster Proximity",
    tag: "Logistics Optimization",
    icon: MapPin,
    description: "Matching buyers with vetted shops in MIDC Bhosari, Peenya, Sanand, or Urla to reduce freight costs, transit damage, and demurrage.",
    criteria: "Direct local plant delivery routes",
  },
];

export function VendorMatchingSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="grid gap-3 sticky top-28">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-teal-600" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
              Technical Vetting Protocol
            </p>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            How RKISPro Audits Every Workshop
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We don&apos;t just ask contractors for a brochure. Our operations engineers verify shop-floor machinery, metallurgy records, and metrology calibration before any RFQ is routed.
          </p>
          <div className="mt-2 rounded-2xl border border-teal-200 bg-teal-50/70 p-4 text-xs text-slate-700">
            <p className="font-bold text-teal-900">Only ~18% of applying workshops qualify</p>
            <p className="mt-1 text-slate-600 leading-relaxed">
              Contractors who cannot demonstrate verifiable machine ownership, primary steel procurement, or calibrated instruments are disqualified from our managed pool.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {protocols.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 transition-all hover:bg-white hover:shadow-md hover:border-teal-500/40 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-3.5 font-bold text-slate-900 text-sm sm:text-base">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.description}</p>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 text-[11px] font-bold text-teal-700">
                  <span className="size-1.5 rounded-full bg-teal-600" />
                  <span>{p.criteria}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
