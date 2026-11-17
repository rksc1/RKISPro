"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Layers, ShieldCheck, Wrench, Zap } from "lucide-react";

export function HeroSourcingWidget() {
  const [tab, setTab] = useState<"fabrication" | "service">("fabrication");

  // Fabrication state
  const [material, setMaterial] = useState<"ms" | "ss" | "al">("ms");
  const [weight, setWeight] = useState<number>(1000);

  // Breakdown state
  const [serviceCategory, setServiceCategory] = useState<string>("breakdown");

  // Price calculations
  const priceRange = {
    ms: { low: Math.round(weight * 95), high: Math.round(weight * 118), days: Math.max(5, Math.ceil(weight / 250)) },
    ss: { low: Math.round(weight * 290), high: Math.round(weight * 340), days: Math.max(7, Math.ceil(weight / 200)) },
    al: { low: Math.round(weight * 340), high: Math.round(weight * 410), days: Math.max(6, Math.ceil(weight / 220)) }
  }[material];

  const materialNames = {
    ms: "Mild Steel (IS 2062)",
    ss: "Stainless Steel (SS 304)",
    al: "Aluminum (6061)"
  };

  const rfqLink = `/customer/request/new?serviceType=Fabrication&materialType=${encodeURIComponent(materialNames[material])}&quantity=${weight}+kg&budgetRange=${encodeURIComponent(`₹${priceRange.low.toLocaleString("en-IN")} - ₹${priceRange.high.toLocaleString("en-IN")}`)}&projectTitle=${encodeURIComponent(`${materialNames[material]} Fabrication (${weight} kg)`)}`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-teal-500/25 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 sm:p-6 text-white">
      {/* Top Tabs */}
      <div className="flex rounded-xl bg-white/5 p-1 text-xs font-bold border border-white/5">
        <button
          type="button"
          onClick={() => setTab("fabrication")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
            tab === "fabrication"
              ? "bg-teal-600 text-white shadow-md shadow-teal-700/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="size-3.5" />
          <span>Custom Fabrication</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("service")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
            tab === "service"
              ? "bg-teal-600 text-white shadow-md shadow-teal-700/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Wrench className="size-3.5" />
          <span>Urgent Breakdown</span>
        </button>
      </div>

      {tab === "fabrication" ? (
        <div className="mt-5 grid gap-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Select Material Grade
            </label>
            <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "ms", label: "Mild Steel", sub: "IS 2062" },
                { id: "ss", label: "SS 304", sub: "Food/Dairy" },
                { id: "al", label: "Aluminum", sub: "6061 / 5052" }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMaterial(item.id as "ms" | "ss" | "al")}
                  className={`rounded-xl border p-2 text-left transition ${
                    material === item.id
                      ? "border-teal-400 bg-teal-400/10 text-white ring-1 ring-teal-400/30"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="block font-bold">{item.label}</span>
                  <span className="text-[10px] text-slate-400 block">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Estimated Weight
              </span>
              <span className="font-mono font-bold text-teal-400">
                {weight >= 1000 ? `${(weight / 1000).toFixed(1)} MT (${weight} kg)` : `${weight} kg`}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="mt-2 w-full accent-teal-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>200 kg</span>
              <span>1 Ton (1000 kg)</span>
              <span>5 Tons</span>
            </div>
          </div>

          {/* Benchmark Output Box */}
          <div className="rounded-2xl border border-teal-500/20 bg-teal-500/[0.06] p-3.5">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Indicative Market Rate</span>
              <span className="flex items-center gap-1 font-semibold text-teal-300 text-[11px]">
                <Clock className="size-3" />
                ~{priceRange.days} Days Delivery
              </span>
            </div>
            <div className="mt-1 text-2xl font-black text-white">
              ₹{priceRange.low.toLocaleString("en-IN")} – ₹{priceRange.high.toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-tight">
              Includes material + laser/plasma cutting + welding + red oxide primer.
            </p>
          </div>

          <Link
            href={rfqLink}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/25 transition hover:bg-teal-400 active:scale-95"
          >
            <span>Get 3–5 Competitive Bids</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Select Breakdown Category
            </label>
            <div className="mt-1.5 grid gap-2">
              {[
                { id: "breakdown", title: "Machine Mechanical Breakdown", desc: "Hydraulic leak, gear alignment, lathe fault" },
                { id: "electrical", title: "Electrical Panel / VFD Fault", desc: "PLC trips, motor drive fault, wiring failure" },
                { id: "ac", title: "Industrial AC / 5TR Package Chiller", desc: "Compressor trip, gas leakage, cooling drop" }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setServiceCategory(item.id)}
                  className={`rounded-xl border p-2.5 text-left transition ${
                    serviceCategory === item.id
                      ? "border-teal-400 bg-teal-400/10 text-white ring-1 ring-teal-400/30"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="block text-xs font-bold text-white">{item.title}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Zap className="size-3.5 text-amber-400" />
              <span>SLA Response Target: &lt; 4 Hours</span>
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Vetted technicians dispatched to your MIDC / Industrial site. Direct WhatsApp & Call coordination.
            </p>
          </div>

          <Link
            href="/customer/quick-booking/new"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 active:scale-95"
          >
            <span>Book Immediate Site Visit</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}

      {/* Trust Seal Footnote */}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="size-3 text-teal-400" />
          Nodal Escrow Protected
        </span>
        <span>Zero Broker Fees</span>
      </div>
    </div>
  );
}
