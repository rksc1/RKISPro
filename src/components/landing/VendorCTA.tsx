import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const vendorBenefits = [
  "Verified shop profile with audited machinery capabilities",
  "High-intent RFQs with engineering CAD drawings upfront",
  "Zero commission on raw materials; fair standardized quotes",
  "Milestone escrow payments held in nodal accounts before work begins",
  "Zero cold-calling; we filter out tire-kickers and low-intent queries",
  "Direct WhatsApp dispatches and automated Lorry Receipt (LR) tracking",
];

export function VendorCTA() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="page-shell">
        <div
          className="relative overflow-hidden rounded-3xl p-8 sm:p-14 shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, #07131F 0%, #0B1D2F 50%, #0F2A3F 100%)",
            border: "1px solid rgba(13,148,136,0.3)",
          }}
        >
          {/* Subtle background glow */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-80 w-80 opacity-20"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(0,196,204,0.6) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 opacity-15"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            {/* Left: Copy */}
            <div className="grid gap-6">
              <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/30">
                For Machine Shops &amp; Fabricators
              </span>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Run a Machine Shop or{" "}
                <span className="text-teal-400">Fabrication Workshop?</span>
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-slate-300">
                Stop paying for unvetted leads and chasing overdue payments. Qualify for the RKISPro network and get production work orders matched to your exact VMC axis travels, laser beds, and crane capacities.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/vendor/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-400 hover:shadow-teal-500/40 min-h-[44px]"
                >
                  Apply for Factory Audit
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-600 min-h-[44px]"
                >
                  How Escrow Works
                </Link>
              </div>
            </div>

            {/* Right: Benefits checklist */}
            <div
              className="rounded-2xl p-6 sm:p-8 backdrop-blur-md"
              style={{
                background: "rgba(11,29,47,0.75)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-teal-300">
                Partner Workshop Benefits
              </p>
              <ul className="grid gap-3.5">
                {vendorBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm font-medium text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
