import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Describe Your Job",
    body: "Tell us what work you need done — share drawings, materials, deadlines, and your site location. We handle the rest.",
    color: "#00C4CC",
  },
  {
    step: "02",
    title: "We Review & Prepare",
    body: "Our team reviews your job, clarifies details, and prepares it so the right contractors can give you their best price.",
    color: "#00A8AF",
  },
  {
    step: "03",
    title: "Get Matched Contractors",
    body: "3–5 verified contractors are matched based on their skills, equipment, location, timeline, and reliability.",
    color: "#F59E0B",
  },
  {
    step: "04",
    title: "Compare, Hire & Track",
    body: "Compare price quotes side by side, pick the right contractor, and track every step of the work until it’s done.",
    color: "#D97706",
  },
];

export function ProcessSteps() {
  return (
    <section
      className="py-20 sm:py-24 bg-white border-y border-slate-200/80"
    >
      <div className="page-shell grid gap-16">
        {/* Header */}
        <div className="max-w-2xl grid gap-3">
          <span className="section-label">How It Works</span>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            From describing your job to{" "}
            <span className="text-teal-600">getting it done.</span>
          </h2>
          <p className="text-base leading-relaxed text-slate-600">
            A structured 4-step workflow that replaces endless phone calls and untracked WhatsApp quotes with accountability and milestone escrow.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-4 lg:grid-cols-4">
          {/* Connector line (desktop) */}
          <div
            className="pointer-events-none absolute left-[calc(12.5%_+_22px)] right-[calc(12.5%_+_22px)] top-[22px] hidden h-0.5 lg:block"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(90deg, rgba(13,148,136,0.4) 0%, rgba(245,158,11,0.3) 60%, rgba(245,158,11,0.1) 100%)",
            }}
          />

          {steps.map((item, i) => (
            <div key={item.step} className="group relative grid gap-5 animate-rise" style={{ animationDelay: `${i * 120}ms` }}>
              {/* Step number bubble */}
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <div
                  className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold transition-all duration-300 group-hover:scale-110 shadow-sm"
                  style={{
                    background: "#FFFFFF",
                    border: `2px solid ${item.color}`,
                    color: item.color,
                  }}
                >
                  {item.step}
                </div>
                {/* Mobile arrow */}
                {i < steps.length - 1 && (
                  <ArrowRight className="size-4 text-slate-400 lg:hidden" />
                )}
              </div>

              {/* Card */}
              <div
                className="rounded-2xl p-5 transition-all duration-200 bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md hover:border-teal-500/40"
              >
                <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
