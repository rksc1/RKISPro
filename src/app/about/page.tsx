import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/landing/FooterSection";
import { ShieldCheck, Users, ClipboardCheck, BarChart3 } from "lucide-react";

const sections = [
  {
    id: "how-it-works",
    label: "How It Works",
    icon: ClipboardCheck,
    title: "From describing your job to getting it done.",
    body: "Tell us what industrial work you need — fabrication, welding, CNC, or repairs. Our team reviews and structures your job, matches it with 3–5 verified local contractors, collects their price quotes, and helps you track the work from start to finish.",
  },
  {
    id: "verification",
    label: "Trust & Verification",
    icon: ShieldCheck,
    title: "Every contractor is verified before they see your job.",
    body: "RKISPro verifies every contractor for business legitimacy (GST/PAN), workshop details, machinery and equipment, service categories, and past project reliability. You only get quotes from people who can actually do the work.",
  },
  {
    id: "matching",
    label: "Smart Matching",
    icon: Users,
    title: "We match contractors by capability, not just availability.",
    body: "Our team reviews each job and hand-selects 3–5 contractors matched by skills, equipment, location, timeline, and track record — so you always compare like-for-like quotes from qualified people.",
  },
  {
    id: "tracking",
    label: "Execution Tracking",
    icon: BarChart3,
    title: "See every milestone, update, and payment clearly.",
    body: "Once you hire a contractor, track every stage of the work through our dashboard. Milestones, updates, and payment status are all visible in one place — no more chasing calls or unclear commitments.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#060E14", minHeight: "100vh" }}>
      <Header />

      {/* Hero */}
      <section className="page-shell py-16 sm:py-20">
        <div className="max-w-3xl grid gap-5">
          <span className="section-label">About RKISPro</span>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            The trusted way to find industrial contractors in India.
          </h1>
          <p className="text-lg leading-relaxed text-navy-100">
            RKISPro is India&apos;s industrial contractor marketplace — built to replace
            cold calls, spreadsheets, and blind trust with a structured, verified,
            and accountable hiring workflow.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="page-shell"><div className="divider-glow" /></div>

      {/* Content sections */}
      <section className="page-shell py-12 grid gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              id={section.id}
              className="bento-card"
            >
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl"
                style={{ background: "rgba(0,196,204,0.1)", border: "1px solid rgba(0,196,204,0.2)" }}
              >
                <Icon className="size-5 text-teal-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-2">
                {section.label}
              </p>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-100/80">
                {section.body}
              </p>
            </div>
          );
        })}
      </section>

      <FooterSection />
    </div>
  );
}
