"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";

interface CoordinatedOrder {
  id: string;
  title: string;
  category: "Fabrication" | "Machining" | "Repair";
  location: string;
  material: string;
  scale: string;
  timeline: string;
  stage: string;
  stageType: "completed" | "in_progress" | "matching";
}

const workOrders: CoordinatedOrder[] = [
  {
    id: "WO-8424",
    title: "Custom MS Sliding Main Gate & Boundary Grills (14x7 ft)",
    category: "Fabrication",
    location: "Bilaspur, Chhattisgarh",
    material: "IS 2062 Mild Steel & Anti-Rust Epoxy Primer",
    scale: "₹42,500",
    timeline: "6-Day Delivery",
    stage: "Welding & Surface Finish Verified",
    stageType: "completed",
  },
  {
    id: "WO-8422",
    title: "SS 304 Balcony & Staircase Glass-Fitted Railing (65 Rft)",
    category: "Fabrication",
    location: "Raipur, Chhattisgarh",
    material: "Jindal SS 304 Pipe & 12mm Toughened Glass",
    scale: "₹68,500",
    timeline: "8-Day Delivery",
    stage: "Mirror Buffing & Fitting Passed",
    stageType: "completed",
  },
  {
    id: "WO-8421",
    title: "16T Structural Base Skid & Column Assembly for Cement Clinker",
    category: "Fabrication",
    location: "Pune MIDC Bhosari",
    material: "IS 2062 Gr. E350 Primary Steel (SAIL)",
    scale: "₹18.4 Lakhs",
    timeline: "24-Day Delivery",
    stage: "Milestone 3/3: Final Paint DFT & Dispatch",
    stageType: "completed",
  },
  {
    id: "WO-8419",
    title: "150 pcs CNC Turned Brass Bushings & Threaded Adaptors",
    category: "Machining",
    location: "Peenya Ind. Area, Bengaluru",
    material: "Free Cutting Brass IS 319 (Grade 1)",
    scale: "₹95,000",
    timeline: "7-Day Batch Run",
    stage: "Dimensional Tolerance (±0.02mm) Verified",
    stageType: "completed",
  },
  {
    id: "WO-8416",
    title: "Galvanized GI Roof Shed & Truss Structure (35x20 ft)",
    category: "Fabrication",
    location: "Sirgitti Ind. Area, Bilaspur",
    material: "Tata Tiscon GI Sheets & Hollow Tubular Sections",
    scale: "₹1.85 Lakhs",
    timeline: "14-Day Delivery",
    stage: "3 Audited Local Fabricators Quoting",
    stageType: "matching",
  },
  {
    id: "WO-8412",
    title: "Emergency On-Site Welding & Heavy Hydraulic Cylinder Overhaul",
    category: "Repair",
    location: "Urla Industrial Area, Raipur",
    material: "Low-Hydrogen E7018 Electrodes & Hard Chrome Rod",
    scale: "₹38,000",
    timeline: "24-Hour Turnaround",
    stage: "On-Site Dye Penetrant Weld Test Clear",
    stageType: "completed",
  },
  {
    id: "WO-8409",
    title: "Heavy Duty Multi-Tier Warehouse Storage Racks (6 Units)",
    category: "Fabrication",
    location: "Chakan Industrial Zone, Pune",
    material: "Slotted Heavy Channels & 2.5mm CRCA Sheets",
    scale: "₹1.65 Lakhs",
    timeline: "10-Day Batch Run",
    stage: "Load Deflection Testing Passed",
    stageType: "in_progress",
  },
  {
    id: "WO-8402",
    title: "4-Axis VMC Machining of Flange Couplings & Valve Manifolds",
    category: "Machining",
    location: "Ambattur, Chennai",
    material: "Aluminium 6061-T6 Billet",
    scale: "₹9.5 Lakhs",
    timeline: "18-Day Delivery",
    stage: "First Article Inspection (FAI) Approved",
    stageType: "in_progress",
  },
];

export function RFQFeed() {
  const [activeTab, setActiveTab] = useState<"All" | "Fabrication" | "Machining" | "Repair">("All");

  const filteredOrders = activeTab === "All"
    ? workOrders
    : workOrders.filter((wo) => wo.category === activeTab);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="page-shell grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-teal-600" />
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
                Managed Work Order Ledger
              </p>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Recently Coordinated Production Runs
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Live snapshot of fabrication, CNC turning, and maintenance work orders audited by RKISPro.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap gap-2">
            {(["All", "Fabrication", "Machining", "Repair"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${activeTab === tab
                    ? "bg-teal-600 text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredOrders.map((order) => {
            return (
              <div
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-teal-500/40 hover:shadow-md grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                      {order.id}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
                      <Building className="size-3.5 text-slate-400" />
                      {order.location}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      • {order.scale}
                    </span>
                  </div>

                  <h3 className="font-display mt-2.5 text-base font-bold text-slate-900 sm:text-lg">
                    {order.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 border border-slate-200">
                      <FileCheck2 className="size-3.5 text-teal-600" />
                      {order.material}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 border border-slate-200">
                      <Clock className="size-3.5 text-amber-600" />
                      {order.timeline}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-snug max-w-full text-left sm:text-right ${order.stageType === "completed"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : order.stageType === "in_progress"
                          ? "bg-teal-50 text-teal-800 border border-teal-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                  >
                    <ShieldCheck className="size-3.5 shrink-0" />
                    <span>{order.stage}</span>
                  </span>

                  <Link
                    href={`/customer/request/new?category=${encodeURIComponent(order.category)}&title=${encodeURIComponent(order.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 transition hover:text-teal-800 hover:underline shrink-0"
                  >
                    <span>Post Similar Requirement</span>
                    <ArrowRight className="size-3" />
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
