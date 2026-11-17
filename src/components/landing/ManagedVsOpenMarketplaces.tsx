import { Check, X, ShieldCheck, AlertCircle } from "lucide-react";

interface ComparisonRow {
  aspect: string;
  openDirectory: string;
  rkispro: string;
}

const comparisonMatrix: ComparisonRow[] = [
  {
    aspect: "Contractor Vetting",
    openDirectory: "Self-declared profiles. Anyone who pays for top ad-tier gets featured.",
    rkispro: "Physical workshop inspection. Verification of machine bed, power sanction & past job proof.",
  },
  {
    aspect: "Contact Privacy",
    openDirectory: "Your mobile number is broadcast to 15–25 vendors; causes persistent spam calls.",
    rkispro: "Zero spam calls. Drawings are routed strictly to 3–5 pre-matched machine shops.",
  },
  {
    aspect: "Quote Transparency",
    openDirectory: "Vague lumpsum numbers scribbled on WhatsApp without material breakdown.",
    rkispro: "Itemized BOM quotes: Raw material grade + machining/weld hours + coating + GST.",
  },
  {
    aspect: "Payment & Escrow Protection",
    openDirectory: "100% advance wire transfer directly to vendor bank account; zero recourse.",
    rkispro: "Milestone Nodal Escrow: Payments released in tranches only after quality checkpoint sign-off.",
  },
  {
    aspect: "Quality Control (QC)",
    openDirectory: "Buyer absorbs 100% of defect, scrap, and rework losses.",
    rkispro: "Raw Material MTC (Mill Test Certificate) + dimensional inspection report before dispatch.",
  },
  {
    aspect: "GST & Tax Compliance",
    openDirectory: "Risk of mismatched invoices causing Indian GST Input Tax Credit (ITC) blockage.",
    rkispro: "CBIC-compliant GST Tax Invoices with SAC 9988 codes and verified GSTR-1 filings.",
  },
];

export function ManagedVsOpenMarketplaces() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ background: "#050F18" }}>
      <div className="page-shell grid gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-teal-400" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-400">
              Procurement Model Comparison
            </p>
          </div>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Why India&apos;s Engineering Teams Switch From Open Directories
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Open directories are lead brokers that prioritize ad spend. RKISPro is an engineered procurement platform built around machine capacity, audited drawings, and milestone escrow.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-800 bg-slate-900/90 text-xs font-bold uppercase tracking-wider text-slate-400">
            <div className="p-4 md:col-span-4 text-slate-300">Procurement Aspect</div>
            <div className="p-4 md:col-span-4 text-rose-400/90 flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-800">
              <AlertCircle className="size-4 shrink-0 text-rose-400" />
              <span>Open Phone Directories</span>
            </div>
            <div className="p-4 md:col-span-4 text-teal-400 flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-800 bg-teal-950/30">
              <ShieldCheck className="size-4 shrink-0 text-teal-400" />
              <span>RKISPro Managed Procurement</span>
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {comparisonMatrix.map((row, idx) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-1 md:grid-cols-12 text-xs sm:text-sm transition-colors hover:bg-slate-900/50 ${
                  idx % 2 === 0 ? "bg-transparent" : "bg-slate-900/20"
                }`}
              >
                {/* Aspect */}
                <div className="p-4 md:col-span-4 font-semibold text-white flex items-center">
                  {row.aspect}
                </div>

                {/* Open Directory */}
                <div className="p-4 md:col-span-4 text-slate-400 flex items-start gap-2.5 border-t md:border-t-0 md:border-l border-slate-800/80">
                  <div className="rounded-full bg-rose-500/10 p-1 text-rose-400 shrink-0 mt-0.5">
                    <X className="size-3.5" />
                  </div>
                  <span className="leading-relaxed">{row.openDirectory}</span>
                </div>

                {/* RKISPro */}
                <div className="p-4 md:col-span-4 text-slate-200 flex items-start gap-2.5 border-t md:border-t-0 md:border-l border-slate-800/80 bg-teal-950/20">
                  <div className="rounded-full bg-teal-500/10 p-1 text-teal-400 shrink-0 mt-0.5">
                    <Check className="size-3.5" />
                  </div>
                  <span className="leading-relaxed font-medium">{row.rkispro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
