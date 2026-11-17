import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck2,
  Lock,
  Layers,
} from "lucide-react";
import { HeroSourcingWidget } from "./HeroSourcingWidget";

const trustPillars = [
  { label: "Factory-Audited Machining & Fab", icon: Building2 },
  { label: "Milestone Escrow Protection", icon: Lock },
  { label: "MTC & Dimensional QC Inspection", icon: FileCheck2 },
  { label: "Zero Spam Telecaller Calls", icon: ShieldCheck },
];

const liveProcurementUpdates = [
  { loc: "MIDC Bhosari", work: "12T Structural Skid Fabrication", status: "MTC Inspected", tag: "Pune" },
  { loc: "Peenya Ind. Area", work: "350 pcs CNC Turned EN8 Shafts", status: "Dispatched", tag: "Bengaluru" },
  { loc: "Sanand GIDC", work: "SS 316 Chemical Reactor Vessel", status: "Argon TIG QC", tag: "Ahmedabad" },
  { loc: "Urla Ind. Complex", work: "Heavy Ball Mill Liner Machining", status: "Milestone Escrow", tag: "Raipur" },
];

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #04090E 0%, #07131D 50%, #0B1C28 100%)" }}
    >
      {/* Precision grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,196,204,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,204,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Atmospheric radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 75% 15%, rgba(0,196,204,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 20% 85%, rgba(245,158,11,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="page-shell relative z-10 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          {/* Left: Copy */}
          <div className="grid gap-6 animate-rise">
            {/* Sector badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-3.5 py-1 text-xs font-bold tracking-wide text-teal-300">
                <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
                MANAGED INDUSTRIAL PROCUREMENT · INDIA
              </span>
              <span className="text-xs font-medium text-navy-200/60 hidden sm:inline-block">
                ISO 9001:2015 & GST Compliant
              </span>
            </div>

            {/* Headline */}
            <div className="grid gap-4">
              <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Custom Fabrication & CNC Machining.{" "}
                <span className="text-gradient-teal">Sourced from Audited Factories.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
                Stop sifting through unvetted phone directories. RKISPro matches your engineering drawings with audited workshops across Pune, Bengaluru, and Ahmedabad—backed by milestone escrow and 100% MTC quality clearance.
              </p>
            </div>

            {/* Authentic Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {trustPillars.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-200 border border-slate-700/60 bg-slate-900/40"
                >
                  <Icon className="size-4 shrink-0 text-teal-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href="/customer/request/new" className="btn-primary gap-2 shadow-lg shadow-teal-500/20 text-sm font-bold px-6 py-3">
                <span>Post Job Request (RFQ)</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/customer/vendors"
                className="btn-secondary gap-2 text-sm font-semibold px-5 py-3 border border-slate-700 hover:border-teal-500/40"
              >
                <Layers className="size-4 text-teal-400" />
                <span>Browse Audited Workshops</span>
              </Link>
            </div>

            {/* Live shop-floor status strip */}
            <div className="pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-2 border-b border-slate-800/80">
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE PRODUCTION DISPATCH
                  </span>
                  <span className="text-[11px] text-slate-400">Audited Shop Floors</span>
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
                  {liveProcurementUpdates.slice(0, 2).map((up) => (
                    <div key={up.work} className="rounded-lg bg-slate-900/70 p-2 border border-slate-800">
                      <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                        <span>{up.loc}</span>
                        <span className="text-teal-400">{up.status}</span>
                      </div>
                      <p className="mt-1 font-medium text-white truncate">{up.work}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Sourcing Estimator Widget */}
          <div className="animate-rise-delay-1">
            <HeroSourcingWidget />
          </div>
        </div>
      </div>

      {/* Bottom fade into light canvas */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, #F8FAFC, transparent)" }}
      />
    </section>
  );
}
