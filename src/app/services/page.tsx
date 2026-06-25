import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/landing/FooterSection";
import { Wrench, Settings, Hammer, Zap, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Hammer,
    title: "Fabrication & Welding",
    body: "Structural fabrication, MIG/TIG welding, custom metalwork, and assembly for industrial projects of all scales.",
    tags: ["Structural Steel", "MIG Welding", "TIG Welding", "Custom Metalwork"],
  },
  {
    icon: Settings,
    title: "CNC & Precision Machining",
    body: "CNC turning, milling, drilling, and precision machining for components requiring tight tolerances.",
    tags: ["CNC Turning", "CNC Milling", "Precision Boring", "Thread Cutting"],
  },
  {
    icon: Wrench,
    title: "Repair & Maintenance",
    body: "Industrial equipment repair, breakdown maintenance, scheduled servicing, and refurbishment work.",
    tags: ["Breakdown Repair", "Preventive Maintenance", "Refurbishment"],
  },
  {
    icon: Package,
    title: "Sheet Metal Work",
    body: "Sheet metal cutting, bending, forming, punching, and custom enclosure fabrication.",
    tags: ["Laser Cutting", "Bending", "Punching", "Enclosures"],
  },
  {
    icon: Zap,
    title: "Electrical & Panel Work",
    body: "Industrial panel fabrication, wiring, control systems, and electrical installations.",
    tags: ["Panel Fabrication", "Control Wiring", "Electrical Install"],
  },
  {
    icon: Settings,
    title: "Lathe & Turning Work",
    body: "Manual and CNC lathe operations for shafts, bushings, flanges, and custom turned parts.",
    tags: ["Shaft Turning", "Bushing", "Flange Work", "Custom Parts"],
  },
];

export default function ServicesPage() {
  return (
    <div style={{ background: "#060E14", minHeight: "100vh" }}>
      <Header />

      {/* Hero */}
      <section className="page-shell py-16 sm:py-20">
        <div className="max-w-3xl grid gap-5">
          <span className="section-label">Our Services</span>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Industrial services, matched to{" "}
            <span className="text-gradient-teal">verified contractors.</span>
          </h1>
          <p className="text-lg leading-relaxed text-navy-100">
            Whatever industrial work you need done, we match your job to the right
            verified contractor — with comparable price quotes and tracked delivery.
          </p>
          <Link href="/auth" className="btn-primary w-fit gap-2">
            Post Your Job <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <div className="page-shell"><div className="divider-glow" /></div>

      {/* Services Grid */}
      <section className="page-shell py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isTeal = i % 2 === 0;
            return (
              <div key={service.title} className="bento-card group">
                <div
                  className="mb-4 inline-flex size-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: isTeal ? "rgba(0,196,204,0.1)" : "rgba(245,158,11,0.1)",
                    border: isTeal ? "1px solid rgba(0,196,204,0.2)" : "1px solid rgba(245,158,11,0.2)",
                  }}
                >
                  <Icon className="size-5" style={{ color: isTeal ? "#00C4CC" : "#F59E0B" }} />
                </div>
                <h2 className="font-display text-base font-bold text-white">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-100/80">{service.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-[11px] font-medium text-navy-100/70"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="page-shell py-12">
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "rgba(0,196,204,0.05)",
            border: "1px solid rgba(0,196,204,0.15)",
          }}
        >
          <h2 className="font-display text-2xl font-bold text-white">
            Don&apos;t see your service listed?
          </h2>
          <p className="mt-2 text-navy-100">
            Post your job anyway — our team will review it and match the right contractor.
          </p>
          <Link href="/auth" className="btn-primary mt-5 inline-flex gap-2">
            Post Your Job <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
