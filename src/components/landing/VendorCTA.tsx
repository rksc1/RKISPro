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
    <section
      className="py-20 sm:py-24"
      style={{ background: "#060E14", borderTop: "1px solid rgba(0,196,204,0.06)" }}
    >
      <div className="page-shell">
        <div
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,24,37,0.95) 0%, rgba(14,30,39,0.9) 60%, rgba(0,196,204,0.04) 100%)",
            border: "1px solid rgba(0,196,204,0.15)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,196,204,0.06)",
          }}
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-20"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(0,196,204,0.5) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 opacity-10"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            {/* Left: Copy */}
            <div className="grid gap-6">
              <span className="section-label">For Machine Shops &amp; Fabricators</span>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Run a Machine Shop or{" "}
                <span className="text-gradient-teal">Fabrication Workshop?</span>
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-navy-100">
                Stop paying for unvetted leads and chasing overdue payments. Qualify for the RKISPro network and get production work orders matched to your exact VMC axis travels, laser beds, and crane capacities.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/vendor/register" className="btn-primary gap-2">
                  Apply for Factory Audit
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="/about" className="btn-secondary gap-2">
                  How Escrow Works
                </Link>
              </div>
            </div>

            {/* Right: Benefits checklist */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(14,30,39,0.7)",
                border: "1px solid rgba(0,196,204,0.1)",
              }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-400">
                Partner Workshop Benefits
              </p>
              <ul className="grid gap-3">
                {vendorBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm font-medium text-navy-100"
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
