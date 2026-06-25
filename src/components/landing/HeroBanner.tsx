import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  ShieldCheck,
  BarChart3,
  Zap,
} from "lucide-react";

const trustBadges = [
  { label: "Expert-reviewed Job Requests", icon: ShieldCheck },
  { label: "3–5 Matched Contractors", icon: Users },
  { label: "Quotes Within 24 Hours", icon: Clock },
  { label: "Comparable Price Quotes", icon: BarChart3 },
  { label: "AI-powered Matching", icon: Zap },
];

const stats = [
  { value: "3–5", label: "Contractors matched per job" },
  { value: "24h", label: "Quote turnaround target" },
  { value: "100%", label: "Verified contractor network" },
];

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060E14 0%, #0A1825 55%, #0E1E27 100%)" }}
    >
      {/* Animated gradient mesh background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 0%, rgba(0,196,204,0.10) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 90% 60%, rgba(245,158,11,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(0,196,204,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,196,204,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,204,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="page-shell relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          {/* Left: Copy */}
          <div className="grid gap-8 animate-rise">
            {/* Section label */}
            <div>
              <span className="section-label">
              <span className="size-1.5 rounded-full bg-teal-500 animate-pulse-slow" />
              Industrial Contractor Marketplace · India
            </span>
            </div>

            {/* Headline */}
            <div className="grid gap-4">
              <h1
                className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Post Your Job.{" "}
                <span className="text-gradient-teal">Get Quotes Fast.</span>{" "}
                <span className="text-white/90">Track the Work.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
                Tell us what industrial work you need done — fabrication, welding,
              CNC, or repairs. We match you with 3–5 verified local contractors,
              collect their price quotes, and help you track the work from start
              to finish.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {trustBadges.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-navy-100"
                  style={{
                    background: "rgba(0,196,204,0.06)",
                    border: "1px solid rgba(0,196,204,0.15)",
                  }}
                >
                  <Icon className="size-3 text-teal-400" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/auth" className="btn-primary gap-2">
                Post Your Job
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/vendor/register" className="btn-secondary gap-2">
                Apply as a Contractor
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Social proof line */}
            <p className="flex items-center gap-2 text-sm text-navy-100/60">
              <CheckCircle2 className="size-4 text-teal-500" />
              Trusted by factories, contractors, and warehouses across India
            </p>
          </div>

          {/* Right: Stats card */}
          <div className="hidden animate-rise-delay-1 lg:block">
            <div
              className="relative overflow-hidden rounded-2xl p-6"
              style={{
                background: "rgba(14, 30, 39, 0.7)",
                border: "1px solid rgba(0, 196, 204, 0.15)",
                boxShadow:
                  "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,196,204,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Corner glow */}
              <div
                className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-30"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(0,196,204,0.4) 0%, transparent 70%)",
                }}
              />

              {/* Factory image */}
              <div
                className="aspect-[16/9] w-full rounded-xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #0A1825 0%, #142435 100%), url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80') center/cover",
                }}
              >
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(6,14,20,0.2) 0%, rgba(6,14,20,0.6) 100%), url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80') center/cover",
                  }}
                />
              </div>

              {/* Stats row */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-4 text-center"
                    style={{
                      background: "rgba(0,196,204,0.05)",
                      border: "1px solid rgba(0,196,204,0.12)",
                    }}
                  >
                    <p className="font-display text-2xl font-extrabold text-gradient-teal">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium leading-tight text-navy-100/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Live indicator */}
              <div className="mt-5 flex items-center gap-2 rounded-xl px-4 py-3"
                style={{ background: "rgba(0,196,204,0.04)", border: "1px solid rgba(0,196,204,0.08)" }}
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-teal-500" />
                </span>
                <p className="text-xs font-medium text-navy-100/80">
                  Our team is currently reviewing new job requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to section below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, #060E14, transparent)" }}
      />
    </section>
  );
}
