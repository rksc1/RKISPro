import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Camera,
  Hammer,
  Wrench,
} from "lucide-react";
import { HeroSourcingWidget } from "./HeroSourcingWidget";

const trustPillars = [
  { label: "From Single Gates to Batch Orders", icon: Hammer },
  { label: "Hand-drawn Sketches & Photos Accepted", icon: Camera },
  { label: "Milestone Payment Safety (No Advance Loss)", icon: Lock },
  { label: "Verified Local Fabricators & Machine Shops", icon: ShieldCheck },
];

const liveProcurementUpdates = [
  { loc: "Bilaspur / Raipur", work: "SS Balcony Railing & Glass Fittings", status: "In Fabrication", tag: "CG" },
  { loc: "MIDC Bhosari", work: "Main Sliding Gate & Safety Grills", status: "Ready for Delivery", tag: "Pune" },
  { loc: "Peenya Ind. Area", work: "15 Heavy Warehouse Storage Trolleys", status: "Welding Done", tag: "Bengaluru" },
  { loc: "Chakan Industrial", work: "Factory Roof Shed & Steel Truss", status: "Installed", tag: "Pune" },
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

      <div className="page-shell relative z-10 pt-14 pb-18 sm:pt-18 sm:pb-22 lg:pt-20 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
          {/* Left: Copy */}
          <div className="grid gap-6 animate-rise">
            {/* Sector badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-3.5 py-1 text-xs font-bold tracking-wide text-teal-300">
                <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
                LOCAL METAL WORK & FABRICATION NETWORK
              </span>
              <span className="text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 px-3 py-1 rounded-full hidden sm:inline-block">
                Home, Commercial & Industrial Projects
              </span>
            </div>

            {/* Headline */}
            <div className="grid gap-3.5">
              <h1 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[3.2rem]">
                Any Metal Work,{" "}
                <span className="text-gradient-teal">Fabricated &amp; Delivered.</span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                From home gates, railings, and shed roofs to custom brackets, trolleys, and machine parts. Send a rough sketch, photo, or drawing—we match you with trusted local fabricators with fair prices and milestone payment safety.
              </p>
            </div>

            {/* Authentic Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {trustPillars.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-200 border border-slate-700/60 bg-slate-900/50"
                >
                  <Icon className="size-4 shrink-0 text-teal-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/customer/request/new"
                className="btn-primary gap-2 shadow-lg shadow-teal-500/20 text-sm font-bold px-6 py-3.5 text-center justify-center min-h-[48px]"
              >
                <span>Get Instant Quote</span>
                <span className="text-xs font-semibold opacity-90 hidden md:inline">• Upload Photo/Sketch</span>
                <ArrowRight className="size-4 shrink-0" />
              </Link>
              <Link
                href="/vendor/register"
                className="btn-secondary gap-2 text-sm font-semibold px-5 py-3.5 border border-slate-700 hover:border-teal-500/40 text-slate-200 hover:text-white bg-slate-900/60 text-center justify-center min-h-[48px]"
              >
                <Wrench className="size-4 text-teal-400 shrink-0" />
                <span>Join as Fabricator / Workshop</span>
              </Link>
            </div>

            {/* Live shop-floor status strip */}
            <div className="pt-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 pb-2 border-b border-slate-800/80">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    RECENT COMPLETED &amp; ACTIVE JOBS
                  </span>
                  <span className="text-[11px] text-teal-400 font-mono">Verified Local Workshops</span>
                </div>
                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {liveProcurementUpdates.slice(0, 2).map((up) => (
                    <div key={up.work} className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800/90">
                      <div className="flex items-center justify-between text-slate-300 font-mono text-[10px]">
                        <span className="font-bold text-slate-200">{up.loc}</span>
                        <span className="text-teal-400 font-semibold">{up.status}</span>
                      </div>
                      <p className="mt-1 font-medium text-slate-100 text-xs line-clamp-1">{up.work}</p>
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
