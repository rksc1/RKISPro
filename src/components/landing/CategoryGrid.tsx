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
  Hammer,
  Building,
  Boxes,
  Home,
  CheckCircle2,
} from "lucide-react";
import { Perspective3DCard } from "@/components/3d/Perspective3DCard";

interface MetalCapability {
  id: string;
  title: string;
  category: string;
  icon: typeof Wrench;
  highlight: string;
  specs: string[];
  benchPrice: string;
  idealFor: string;
  rfqCategory: string;
}

const metalCapabilities: MetalCapability[] = [
  {
    id: "home-gates-railings",
    title: "Gates, Railings & Window Grills",
    category: "Home & Architectural",
    icon: Home,
    highlight: "Custom Sizes & Designs",
    specs: [
      "Sliding main gates, swing gates & wicket gates",
      "SS 304 balcony & staircase railings with glass/cable",
      "Window safety grills & designer laser-cut ornamental panels",
    ],
    benchPrice: "₹140 – ₹280 / sq.ft",
    idealFor: "Homes, Villas, Apartments & Shops",
    rfqCategory: "Fabrication",
  },
  {
    id: "roof-sheds-trusses",
    title: "Roof Sheds, Trusses & Structures",
    category: "Structural Sheds",
    icon: Building,
    highlight: "Tough Weatherproof Steel",
    specs: [
      "Factory, godown & warehouse tubular sheds",
      "Car parking canopies, terrace sheds & poly-sheet roofs",
      "Heavy steel staircases & mezzanine storage platforms",
    ],
    benchPrice: "₹110 – ₹160 / sq.ft",
    idealFor: "Warehouses, Workshops, Commercial Roofs",
    rfqCategory: "Fabrication",
  },
  {
    id: "workshop-trolleys-racks",
    title: "Commercial Racks, Trolleys & Frames",
    category: "Storage & Commercial",
    icon: Boxes,
    highlight: "Heavy Load Capacity",
    specs: [
      "Heavy duty warehouse pallet racks & slotted angle shelving",
      "Factory tool trolleys, mobile carts & material handling bins",
      "Machine base frames, workbenches & water tank stands",
    ],
    benchPrice: "₹4,500 – ₹18,000 / unit",
    idealFor: "Factories, Retail Stores, Logistics",
    rfqCategory: "Fabrication",
  },
  {
    id: "sheet-metal-enclosures",
    title: "Sheet Metal Boxes, Tanks & Covers",
    category: "Sheet Metal & Enclosures",
    icon: Cpu,
    highlight: "CNC Laser Cutting & Bending",
    specs: [
      "Custom electrical control panels & battery enclosures",
      "SS 304 / MS storage tanks, hoppers, funnels & chutes",
      "Precision sheet metal bending, punching & powder coating",
    ],
    benchPrice: "Custom Drawing / Sample",
    idealFor: "Equipment Builders, Electrical, Food/Pharma",
    rfqCategory: "Fabrication",
  },
  {
    id: "lathe-machining",
    title: "Lathe Turning, Shafts & CNC Machining",
    category: "Machining & Precision Parts",
    icon: Cog,
    highlight: "High Accuracy / Any Quantity",
    specs: [
      "Precision lathe turning, facing, threading & boring",
      "Drive shafts, pins, bushings, pulleys & rollers in EN8/EN19",
      "3-Axis & 4-Axis CNC milling for precision custom parts",
    ],
    benchPrice: "From ₹650/hr or per-piece",
    idealFor: "Industrial Spares, Toolrooms, Automotive",
    rfqCategory: "Machining",
  },
  {
    id: "repair-onsite-welding",
    title: "On-Site Welding, Repair & Modification",
    category: "Repair & Maintenance",
    icon: Wrench,
    highlight: "Fast Local Response",
    specs: [
      "Broken gate hinges, shutter repair & frame reinforcement",
      "On-site structural welding, gas cutting & modifications",
      "Urgent machine part repair & fabrication troubleshooting",
    ],
    benchPrice: "Day Rate or Job-Based",
    idealFor: "Residential, Plants & Local Businesses",
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
                Fabrication &amp; Metal Work Services
              </p>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              What Metal Work Do You Need Done?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              From a single custom gate or repair to warehouse sheds and precision machine batches. Send a sketch or photo—we get it made through verified local workshops.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/customer/request/new"
              className="inline-flex items-center gap-2 rounded-xl border border-teal-600 bg-teal-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-700 shadow-md shadow-teal-700/20"
            >
              <span>Post Your Requirement</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {metalCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Perspective3DCard key={cap.id} maxTilt={5}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 transition-all duration-200 hover:border-teal-500/50 hover:shadow-lg">
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

                    <h3 className="font-display mt-4 text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors min-h-[52px] flex items-center">
                      {cap.title}
                    </h3>

                    {/* Bullet specs */}
                    <ul className="mt-3.5 space-y-2 text-xs text-slate-600 min-h-[92px]">
                      {cap.specs.map((spec) => (
                        <li key={spec} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col justify-between gap-3">
                    <div className="grid gap-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Typical Price:</span>
                        <span className="font-mono font-bold text-slate-900">{cap.benchPrice}</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-slate-500 text-[11px] font-medium shrink-0">Ideal For:</span>
                        <span className="text-slate-800 font-semibold text-xs text-right leading-tight">{cap.idealFor}</span>
                      </div>
                    </div>

                    <Link
                      href={`/customer/request/new?serviceType=Fabrication&projectTitle=${encodeURIComponent(
                        cap.title
                      )}`}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 py-2.5 text-xs font-bold text-teal-800 transition-colors group-hover:bg-teal-600 group-hover:text-white"
                    >
                      <span>Get Free Quote for This</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </Perspective3DCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
