import Link from "next/link";
import {
  Wrench,
  Cog,
  Cpu,
  Layers,
  Flame,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface IndustrialCapability {
  id: string;
  title: string;
  category: string;
  icon: typeof Wrench;
  highlight: string;
  specs: string[];
  benchPrice: string;
  hub: string;
  rfqCategory: string;
}

const industrialCapabilities: IndustrialCapability[] = [
  {
    id: "structural-fab",
    title: "Heavy MS & Structural Fabrication",
    category: "Structural Fabrication",
    icon: Layers,
    highlight: "IS 2062 Gr. E250/E350",
    specs: ["10T EOT crane bays", "SAW & MIG automated weld lines", "Base skids, hoppers & crane gantries"],
    benchPrice: "From ₹92–₹115/kg",
    hub: "MIDC Bhosari & Raipur",
    rfqCategory: "Fabrication",
  },
  {
    id: "cnc-machining",
    title: "Precision CNC Machining & VMC",
    category: "CNC Machining",
    icon: Cog,
    highlight: "±0.01mm (10µm) Tolerances",
    specs: ["3-Axis & 4-Axis Haas/Mazak VMCs", "NABL CMM dimensional inspection", "AL 6061, Delrin, SS 316, Inconel"],
    benchPrice: "₹850–₹1,400/hr",
    hub: "Peenya Ind. Area & Coimbatore",
    rfqCategory: "Machining",
  },
  {
    id: "ss-tanks",
    title: "SS 304 / 316 Sanitary Vessels",
    category: "Stainless Steel Fabrication",
    icon: Flame,
    highlight: "Argon TIG & Mirror Ra < 0.4µm",
    specs: ["Pharma & food grade ASME Sec VIII", "Hydro-tested to 6 bar pressure", "Orbital pipe welding & passivation"],
    benchPrice: "Custom Drawing-Based",
    hub: "Sanand GIDC & Ankleshwar",
    rfqCategory: "Fabrication",
  },
  {
    id: "sheet-metal",
    title: "Fiber Laser Cutting & CNC Bending",
    category: "Sheet Metal Fabrication",
    icon: Cpu,
    highlight: "12kW Laser (Up to 25mm MS)",
    specs: ["150T multi-axis CNC press brakes", "CAD/DXF nesting for minimal scrap", "Custom enclosures, brackets & chassis"],
    benchPrice: "48h Dispatch Batch",
    hub: "Chakan & Manesar",
    rfqCategory: "Fabrication",
  },
  {
    id: "heavy-lathe",
    title: "Heavy Lathe Turning & Pinion Shafts",
    category: "Lathe & Turning",
    icon: Wrench,
    highlight: "Up to 3.5m Length / 800mm Swing",
    specs: ["EN8, EN19 & EN24 hardened steels", "Dynamic balancing to ISO 1940 G2.5", "Internal boring & spline cutting"],
    benchPrice: "Custom Batch Rates",
    hub: "Ludhiana & Belgaum",
    rfqCategory: "Machining",
  },
  {
    id: "plant-breakdown",
    title: "Emergency Breakdown & Line Boring",
    category: "Industrial Maintenance",
    icon: Clock,
    highlight: "Technician at Gate < 4 Hours",
    specs: ["On-site portable line boring rigs", "Hydraulic cylinder reseal & rebuild", "In-situ welding & gearbox alignment"],
    benchPrice: "Fixed Callout + Day Rate",
    hub: "Pan-India Corridors",
    rfqCategory: "Repair",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="page-shell grid gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-teal-600" />
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
                Audited Manufacturing Capabilities
              </p>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Engineered Capabilities. Rigorous Standards.
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Contractors in our network hold physical factory audits, ISO 9001 certifications, and verified machinery inventories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/customer/vendors"
              className="inline-flex items-center gap-2 rounded-xl border border-teal-600 bg-teal-50 px-4 py-2.5 text-xs font-bold text-teal-800 transition hover:bg-teal-100"
            >
              <ShieldCheck className="size-4 text-teal-600" />
              <span>Browse All Audited Machine Shops</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industrialCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-md"
              >
                <div>
                  {/* Top pill row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      <Icon className="size-3.5 text-teal-600" />
                      {cap.category}
                    </span>
                    <span className="font-mono text-[10px] text-teal-800 font-bold bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                      {cap.highlight}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {cap.title}
                  </h3>

                  {/* Bullet specs */}
                  <ul className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                    {cap.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">›</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
                    <span>Benchmark:</span>
                    <span className="font-mono font-bold text-slate-900">{cap.benchPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pb-3">
                    <span>Industrial Hubs:</span>
                    <span className="text-slate-800 font-medium">{cap.hub}</span>
                  </div>

                  <Link
                    href={`/customer/request/new?category=${encodeURIComponent(cap.rfqCategory)}&title=${encodeURIComponent(cap.title)}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 py-2.5 text-xs font-bold text-teal-800 transition-colors group-hover:bg-teal-600 group-hover:text-white"
                  >
                    <span>Request Job Quote</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
