import {
  ShieldCheck,
  Users,
  ClipboardList,
  BadgeCheck,
  BarChart3,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Expert-reviewed Job Requests",
    body: "Every job you post is reviewed and structured by our team before reaching contractors — no noise, no generic inquiries.",
    color: "teal",
  },
  {
    icon: Users,
    title: "3–5 Matched Contractors",
    body: "We match only 3–5 verified contractors per job based on their skills, equipment, location, and track record.",
    color: "amber",
  },
  {
    icon: BadgeCheck,
    title: "Comparable Price Quotes",
    body: "Contractors submit standardised quotes with itemised rates, timelines, and terms — making it easy to compare apples to apples.",
    color: "teal",
  },
  {
    icon: ShieldCheck,
    title: "Verified Contractors",
    body: "Every contractor is verified for business legitimacy, equipment, certifications, and past project reliability before joining.",
    color: "amber",
  },
  {
    icon: BarChart3,
    title: "Track Your Work",
    body: "Follow milestones, get progress updates, and see delivery checkpoints through every stage of the job.",
    color: "teal",
  },
  {
    icon: Wallet,
    title: "Full Payment Visibility",
    body: "From advance payment to final settlement — every rupee is tracked transparently so there are no surprises.",
    color: "amber",
  },
];

export function FeatureCards() {
  return (
    <section
      className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80"
    >
      <div className="page-shell grid gap-14">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div className="grid gap-3">
            <span className="section-label">Why RKISPro</span>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Built to make hiring industrial contractors{" "}
              <span className="text-teal-600">simple and safe.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:pb-2">
            No more cold calls and blind trust. RKISPro verifies every contractor, structures your job request, and makes sure you get fair, comparable prices from people who can actually do the work.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isTeal = feature.color === "teal";
            return (
              <div
                key={feature.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-md"
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div>
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex size-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      isTeal
                        ? "bg-teal-50 border border-teal-100 text-teal-600"
                        : "bg-amber-50 border border-amber-100 text-amber-600"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.body}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`mt-5 h-0.5 w-0 transition-all duration-500 group-hover:w-full ${
                    isTeal
                      ? "bg-gradient-to-r from-teal-500 to-transparent"
                      : "bg-gradient-to-r from-amber-500 to-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
