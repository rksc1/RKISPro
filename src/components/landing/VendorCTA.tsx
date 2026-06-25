import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const vendorBenefits = [
  "Verified business profile",
  "Matched to jobs in your category",
  "Clear job scope and documents upfront",
  "See price quotes and payment status",
  "No cold calls or chasing customers",
  "Work tracking dashboard",
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
              <span className="section-label">Join as a Contractor</span>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Are You an Industrial{" "}
                <span className="text-gradient-teal">Contractor or Manufacturer?</span>
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-navy-100">
                Join our verified network and receive job requests matched to your
                specific skills and equipment — with clear scope, fair pricing, and
                payment visibility built in.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/vendor/register" className="btn-primary gap-2">
                  Apply as a Contractor
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="/about" className="btn-secondary gap-2">
                  Learn More
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
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-500">
                What you get as a contractor
              </p>
              <ul className="grid gap-3">
                {vendorBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm font-medium text-navy-100"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-500" />
                    {benefit}
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
