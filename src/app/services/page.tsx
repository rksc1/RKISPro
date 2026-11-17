import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/landing/FooterSection";
import {
  Layers,
  Cog,
  Flame,
  Cpu,
  Wrench,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calculator,
  CheckCircle2,
} from "lucide-react";

interface IndustrialService {
  id: string;
  title: string;
  category: string;
  icon: typeof Layers;
  highlight: string;
  description: string;
  machinery: string[];
  materials: string[];
  benchmark: string;
  leadTime: string;
  clusters: string;
  rfqCategory: string;
}

const detailedServices: IndustrialService[] = [
  {
    id: "structural-fab",
    title: "Heavy MS & Structural Fabrication",
    category: "Structural Fabrication",
    icon: Layers,
    highlight: "IS 2062 Gr. E250/E350 Primary Steel",
    description: "End-to-end heavy steel fabrication for factory mezzanines, crane gantries, equipment base skids, and storage silos. Backed by automated submerged arc welding (SAW) and ultrasonic weld testing.",
    machinery: ["10T EOT Cranes", "Automated SAW & MIG Stations", "Hydraulic Shearing & Section Bending"],
    materials: ["IS 2062 Mild Steel (SAIL / Tata)", "Galvanized Sections", "High-Tensile Plates"],
    benchmark: "From ₹92–₹115/kg",
    leadTime: "15–25 Days",
    clusters: "MIDC Bhosari (Pune) & Urla (Raipur)",
    rfqCategory: "Fabrication",
  },
  {
    id: "cnc-machining",
    title: "Precision CNC Machining & VMC Milling",
    category: "Precision Machining",
    icon: Cog,
    highlight: "Tolerances to ±0.01mm (10 Microns)",
    description: "High-precision turning, milling, and multi-axis machining for critical automotive, aerospace, and hydraulic components. Every batch is inspected via NABL-accredited Coordinate Measuring Machines (CMM).",
    machinery: ["3-Axis & 4-Axis Haas / Mazak VMCs", "CNC Turning Centers", "NABL CMM Inspection Arms"],
    materials: ["Aluminium 6061 / 7075", "Alloy Steel EN19 / EN24", "Delrin & Brass", "SS 304 / 316"],
    benchmark: "₹850–₹1,400/machining hr",
    leadTime: "10–14 Days",
    clusters: "Peenya Industrial Area & Ambattur",
    rfqCategory: "Machining",
  },
  {
    id: "ss-vessels",
    title: "SS 304 / 316 Sanitary Vessels & Reactors",
    category: "Stainless Steel Fabrication",
    icon: Flame,
    highlight: "Argon TIG & Mirror Ra < 0.4µm",
    description: "Sanitary grade storage tanks, chemical reactors, dimple cooling jackets, and piping manifolds for food, dairy, and pharmaceutical plants. 100% hydro-tested to 6.5 bar with passivation test certificates.",
    machinery: ["Automated Orbital TIG Welding", "Plate Rolling Machines (up to 16mm)", "Electropolishing Bays"],
    materials: ["SS 304 / 304L", "SS 316 / 316L (Jindal Stainless)", "Titanium & Hastelloy on request"],
    benchmark: "Custom Drawing-Based",
    leadTime: "25–35 Days",
    clusters: "Sanand GIDC & Ankleshwar",
    rfqCategory: "Fabrication",
  },
  {
    id: "sheet-metal",
    title: "Fiber Laser Cutting & CNC Press Brakes",
    category: "Sheet Metal Works",
    icon: Cpu,
    highlight: "12kW Laser (Up to 25mm MS / 16mm SS)",
    description: "High-speed laser cutting, CNC multi-axis bending, and sheet metal enclosures. Optimized CAD/DXF nesting minimizes material scrap and guarantees rapid prototype to production batch dispatch.",
    machinery: ["12kW Fiber Laser Systems", "150T CNC Hydraulic Press Brakes", "PEM Nut Insertion Machines"],
    materials: ["CRCA Steel", "Galvanized Iron (GI)", "Aluminium 5052", "Stainless Steel"],
    benchmark: "48h Dispatch on Standard Batches",
    leadTime: "3–7 Days",
    clusters: "Chakan (Pune) & Manesar (NCR)",
    rfqCategory: "Fabrication",
  },
  {
    id: "heavy-lathe",
    title: "Heavy Lathe Turning & Pinion Shafts",
    category: "Lathe & Turning",
    icon: Wrench,
    highlight: "Up to 3.5m Length / 800mm Swing",
    description: "Heavy-duty turning, deep hole boring, internal splines, and dynamic balancing for industrial drive shafts, rollers, and pinions. Heat treatment and surface hardening up to 55 HRC.",
    machinery: ["Heavy Duty Lathes (3.5m bed)", "Horizontal Boring Machines", "Dynamic Balancing Rig ISO 1940"],
    materials: ["Carbon Steels EN8 / EN9", "Case Hardening Steels 20MnCr5", "Cast Iron GG25"],
    benchmark: "Standard Batch & Prototype Rates",
    leadTime: "12–18 Days",
    clusters: "Ludhiana & Belgaum",
    rfqCategory: "Machining",
  },
  {
    id: "emergency-repair",
    title: "Emergency Breakdown & Line Boring",
    category: "Industrial Maintenance",
    icon: Clock,
    highlight: "Technician at Factory Gate < 4 Hours",
    description: "Emergency on-site field maintenance for machine breakdowns, hydraulic cylinder overhauls, in-situ line boring, and electrical VFD panel repairs. Dedicated technicians dispatched with mobile diagnostic rigs.",
    machinery: ["Portable Line Boring Rigs", "Hydraulic Power Packs", "Vibration Analyzers & Thermal Cameras"],
    materials: ["Polyurethane Seals", "Hard Chrome Plated Rods", "Schneider / Siemens Switchgear"],
    benchmark: "Fixed Callout + Hourly Tech Rate",
    leadTime: "Immediate Dispatch (< 4h)",
    clusters: "Pan-India Industrial Corridors",
    rfqCategory: "Repair",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      {/* Hero Section - Executive Navy Anchor */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-slate-800"
        style={{
          background: "linear-gradient(180deg, #07131F 0%, #0B1D2F 60%, #0E243A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,196,204,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,204,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="page-shell relative z-10">
          <div className="max-w-3xl grid gap-5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-teal-400">
                Audited Manufacturing Capabilities
              </span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Precision Fabrication &amp; Machining.{" "}
              <span className="text-teal-400">Execution You Can Audit.</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-300">
              RKISPro matches your technical drawings with verified machine shops across Pune MIDC, Peenya, and Sanand GIDC. Every order is backed by primary mill test certificates (MTC), milestone escrow, and 4-gate quality inspection.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/customer/request/new" className="btn-primary gap-2 text-sm font-bold px-6 py-3">
                <span>Post Job Requirement (RFQ)</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/customer/estimator"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 hover:border-slate-600"
              >
                <Calculator className="size-4 text-teal-400" />
                <span>Calculate Cost Estimate</span>
              </Link>
              <Link
                href="/customer/vendors"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition"
              >
                <Building2 className="size-4 text-teal-400" />
                <span>Browse All Machine Shops</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Daylight Light Slate Section */}
      <section className="page-shell py-16 sm:py-20">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Manufacturing Capabilities Breakdown
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Rigorous shop-floor standards across structural steel, CNC milling, sheet metal, and breakdown maintenance.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <CheckCircle2 className="size-3.5" />
            100% Factory Audited
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {detailedServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-teal-50 border border-teal-100 text-teal-600">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {service.highlight}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  {/* Machinery Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Shop Floor Machinery:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {service.machinery.map((m) => (
                        <li key={m} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold">›</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Material Grades */}
                  <div className="mt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Verified Grades:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.materials.map((mat) => (
                        <span
                          key={mat}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Benchmark & Action */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
                    <span>Benchmark:</span>
                    <span className="font-mono font-bold text-slate-900">{service.benchmark}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pb-3">
                    <span>Hubs:</span>
                    <span className="text-slate-800 font-medium">{service.clusters}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/customer/request/new?category=${encodeURIComponent(service.rfqCategory)}&title=${encodeURIComponent(service.title)}`}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-teal-600 bg-teal-50 py-2.5 text-xs font-bold text-teal-700 transition hover:bg-teal-600 hover:text-white"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="size-3" />
                    </Link>
                    <Link
                      href={`/customer/vendors?services=${encodeURIComponent(service.rfqCategory)}`}
                      className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Building2 className="size-3 text-slate-500" />
                      <span>View Shops</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Industrial Trust Banner */}
      <section className="page-shell pb-20">
        <div
          className="rounded-3xl p-8 sm:p-12 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, #07131F 0%, #0B1D2F 50%, #0F2A3F 100%)",
            border: "1px solid rgba(13,148,136,0.3)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="size-4" />
              <span>Milestone Escrow &amp; MTC Guarantee</span>
            </div>
            <h2 className="font-display mt-2 text-2xl font-black sm:text-3xl text-white">
              Need custom drawings quoted by 3–5 vetted factories?
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl leading-relaxed">
              Upload your STEP or PDF drawings. RKISPro reviews the tolerances, coordinates factory visits, and provides standardized bids within 24 hours.
            </p>
          </div>
          <Link
            href="/customer/request/new"
            className="btn-primary shrink-0 gap-2 text-sm font-bold px-6 py-3"
          >
            <span>Post Your Job Request</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}