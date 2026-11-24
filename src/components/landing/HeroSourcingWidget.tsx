"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Hammer,
  Layers,
  ShieldCheck,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

export function HeroSourcingWidget() {
  const [tab, setTab] = useState<"small_metal" | "industrial">("small_metal");

  // Small metal work state
  const [workType, setWorkType] = useState<string>("gate");
  const [customItemTitle, setCustomItemTitle] = useState<string>("");
  const [metalGrade, setMetalGrade] = useState<"ms" | "ss">("ms");

  // Industrial state
  const [indMaterial, setIndMaterial] = useState<"ms" | "ss" | "al">("ms");
  const [weight, setWeight] = useState<number>(500);

  // Estimates for small metal work
  const smallWorkEstimates: Record<
    string,
    { title: string; ms: { price: string; days: string }; ss: { price: string; days: string } }
  > = {
    gate: {
      title: "Main Gate / Sliding Gate",
      ms: { price: "₹15,000 – ₹35,000", days: "4–7 days" },
      ss: { price: "₹35,000 – ₹85,000", days: "6–10 days" },
    },
    railing: {
      title: "Balcony / Staircase Railing",
      ms: { price: "₹180 – ₹280 / sq.ft", days: "3–6 days" },
      ss: { price: "₹450 – ₹850 / sq.ft", days: "4–8 days" },
    },
    shed: {
      title: "Roof Shed / Parking Structure",
      ms: { price: "₹110 – ₹160 / sq.ft", days: "5–10 days" },
      ss: { price: "₹280 – ₹420 / sq.ft", days: "7–12 days" },
    },
    grill: {
      title: "Window Safety Grills",
      ms: { price: "₹130 – ₹190 / sq.ft", days: "3–5 days" },
      ss: { price: "₹320 – ₹520 / sq.ft", days: "4–7 days" },
    },
    trolley: {
      title: "Storage Racks / Heavy Trolleys",
      ms: { price: "₹6,500 – ₹18,000 / unit", days: "3–6 days" },
      ss: { price: "₹16,000 – ₹42,000 / unit", days: "5–9 days" },
    },
    custom: {
      title: "Custom Metal Item / Specific Part",
      ms: { price: "Quote in 2–4 hrs", days: "Fast local delivery" },
      ss: { price: "Quote in 2–4 hrs", days: "Fast local delivery" },
    },
  };

  const isCustom = workType === "custom";
  const activeTitle = isCustom && customItemTitle.trim()
    ? customItemTitle.trim()
    : smallWorkEstimates[workType]?.title || "Custom Metal Fabrication";

  const currentSmallEstimate = smallWorkEstimates[workType] || smallWorkEstimates.custom;
  const currentPrice = isCustom ? "Quote in 2–4 hrs" : currentSmallEstimate[metalGrade].price;
  const currentDays = isCustom ? "Fast local delivery" : currentSmallEstimate[metalGrade].days;

  // Industrial estimate
  const indPriceRange = {
    ms: { low: Math.round(weight * 95), high: Math.round(weight * 118), days: Math.max(5, Math.ceil(weight / 250)) },
    ss: { low: Math.round(weight * 290), high: Math.round(weight * 340), days: Math.max(7, Math.ceil(weight / 200)) },
    al: { low: Math.round(weight * 340), high: Math.round(weight * 410), days: Math.max(6, Math.ceil(weight / 220)) },
  }[indMaterial];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  const smallRfqLink = `/customer/request/new?serviceType=Fabrication&projectTitle=${encodeURIComponent(
    activeTitle
  )}&materialType=${encodeURIComponent(
    metalGrade === "ms" ? "Mild Steel / Iron" : "Stainless Steel (SS 304)"
  )}&budgetRange=${encodeURIComponent(isCustom ? "Custom Free Estimate" : currentPrice)}`;

  const indRfqLink = `/customer/request/new?serviceType=Industrial+Fabrication&materialType=${encodeURIComponent(
    indMaterial === "ms" ? "Mild Steel (IS 2062)" : indMaterial === "ss" ? "SS 304" : "Aluminum"
  )}&quantity=${weight}+kg&budgetRange=${encodeURIComponent(
    `₹${indPriceRange.low.toLocaleString("en-IN")} - ₹${indPriceRange.high.toLocaleString("en-IN")}`
  )}`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-teal-500/25 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 sm:p-6 text-white">
      {/* Top Tabs */}
      <div className="flex rounded-xl bg-white/5 p-1 text-xs font-bold border border-white/5">
        <button
          type="button"
          onClick={() => setTab("small_metal")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
            tab === "small_metal"
              ? "bg-teal-600 text-white shadow-md shadow-teal-700/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Hammer className="size-3.5" />
          <span>Home &amp; Metal Work</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("industrial")}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
            tab === "industrial"
              ? "bg-teal-600 text-white shadow-md shadow-teal-700/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="size-3.5" />
          <span>Industrial &amp; Batch</span>
        </button>
      </div>

      {tab === "small_metal" ? (
        <div className="mt-5 grid gap-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Select What You Want Fabricated
              </label>
              <span className="text-[10px] text-teal-300 font-medium">Or choose custom</span>
            </div>
            <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "gate", label: "Gate / Door" },
                { id: "railing", label: "Railings" },
                { id: "shed", label: "Roof Shed" },
                { id: "grill", label: "Safety Grill" },
                { id: "trolley", label: "Rack / Trolley" },
                { id: "custom", label: "+ Custom Item" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWorkType(item.id)}
                  className={`rounded-xl border p-2 text-center transition font-semibold min-h-[44px] flex items-center justify-center leading-tight ${
                    workType === item.id
                      ? "border-teal-400 bg-teal-400/20 text-white ring-1 ring-teal-400/40 font-bold"
                      : item.id === "custom"
                      ? "border-teal-500/40 bg-teal-500/10 text-teal-300 hover:border-teal-400 hover:text-white"
                      : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Custom Item Input Box */}
            {isCustom ? (
              <div className="mt-2.5 rounded-2xl border border-teal-500/40 bg-teal-500/10 p-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[11px] font-bold text-teal-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-teal-400" />
                    What specific item do you want to make?
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Any metal work</span>
                </div>
                <input
                  type="text"
                  value={customItemTitle}
                  onChange={(e) => setCustomItemTitle(e.target.value)}
                  placeholder="e.g. Spiral staircase, Gym rack, Chimney hood, Tank stand, Canopy..."
                  className="mt-1.5 w-full rounded-xl border border-teal-500/50 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                  autoFocus
                />
                <p className="mt-1.5 text-[10px] text-slate-300">
                  We fabricate literally anything in metal. Type what you need and upload a rough sketch or photo!
                </p>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Want to make something specific?</span>
                <button
                  type="button"
                  onClick={() => setWorkType("custom")}
                  className="text-teal-400 hover:text-teal-300 font-bold underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Type your own item</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Metal Type
            </label>
            <div className="mt-1.5 grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setMetalGrade("ms")}
                className={`rounded-xl border p-2.5 text-left transition ${
                  metalGrade === "ms"
                    ? "border-teal-400 bg-teal-400/15 text-white ring-1 ring-teal-400/40"
                    : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="font-bold text-white text-xs">Mild Steel (Iron)</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Economical, Strong, Painted</div>
              </button>
              <button
                type="button"
                onClick={() => setMetalGrade("ss")}
                className={`rounded-xl border p-2.5 text-left transition ${
                  metalGrade === "ss"
                    ? "border-teal-400 bg-teal-400/15 text-white ring-1 ring-teal-400/40"
                    : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="font-bold text-white text-xs">Stainless Steel (SS 304)</div>
                <div className="text-[11px] text-teal-300 mt-0.5 font-medium">Rust-Proof Mirror / Matt</div>
              </button>
            </div>
          </div>

          {/* Pricing Estimation Card */}
          <div className="rounded-2xl border border-teal-500/30 bg-slate-950/80 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-300">
                  {isCustom ? "Free Verified Quote" : "Estimated Local Market Rate"}
                </p>
                <p className="font-mono text-xl sm:text-2xl font-black text-teal-400">{currentPrice}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-300">Turnaround</p>
                <p className="font-mono text-sm font-bold text-slate-100">{currentDays}</p>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] text-slate-300 leading-normal border-t border-slate-800/90 pt-2 font-medium">
              {isCustom
                ? `3–5 audited local workshops will inspect your ${
                    customItemTitle.trim() ? `"${customItemTitle.trim()}"` : "item"
                  } specifications and provide exact quotes.`
                : "Includes material + cutting + welding + primer coat. Mobile photos & paper sketches accepted."}
            </p>
          </div>

          <div className="grid gap-2 pt-1">
            <Link
              href={smallRfqLink}
              className="btn-primary w-full justify-center gap-2 py-3 text-xs font-bold shadow-lg shadow-teal-600/25"
            >
              <Camera className="size-4" />
              <span>
                {isCustom && customItemTitle.trim()
                  ? `Get Quote for "${customItemTitle.trim()}"`
                  : isCustom
                  ? "Get Quote for Custom Item (Upload Sketch/Photo)"
                  : "Get Exact Quote (Upload Photo / Sketch)"}
              </span>
              <ArrowRight className="size-3.5" />
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                isCustom && customItemTitle.trim()
                  ? `Hi RKISPro Team, I want to get a quote for fabricating "${customItemTitle.trim()}" in ${
                      metalGrade === "ms" ? "Mild Steel / Iron" : "Stainless Steel (SS 304)"
                    }. Can you help?`
                  : `Hi RKISPro Team, I have a metal fabrication requirement (${activeTitle}) and want a quick quote.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition"
            >
              <MessageSquareText className="size-4 text-emerald-400" />
              <span>
                {isCustom && customItemTitle.trim()
                  ? `Ask on WhatsApp for "${customItemTitle.trim()}"`
                  : "Or Send Photo / Drawing on WhatsApp"}
              </span>
            </a>
          </div>
        </div>
      ) : (
        /* Industrial Batch Tab */
        <div className="mt-5 grid gap-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Select Material Grade
            </label>
            <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs">
              {[
                { id: "ms", label: "Mild Steel", sub: "IS 2062" },
                { id: "ss", label: "SS 304", sub: "Sanitary / Food" },
                { id: "al", label: "Aluminum", sub: "6061 / 5052" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndMaterial(item.id as "ms" | "ss" | "al")}
                  className={`rounded-xl border p-2 text-left transition ${
                    indMaterial === item.id
                      ? "border-teal-400 bg-teal-400/10 text-white ring-1 ring-teal-400/30"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold text-white">{item.label}</div>
                  <div className="text-[10px] text-slate-400">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-300">
              <span>Batch Weight / Volume</span>
              <span className="font-mono text-teal-400">{weight.toLocaleString("en-IN")} kg</span>
            </div>
            <input
              type="range"
              min={100}
              max={5000}
              step={50}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="mt-2 w-full accent-teal-400 cursor-pointer"
            />
          </div>

          <div className="rounded-2xl border border-teal-500/20 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Batch Estimate</p>
                <p className="font-mono text-xl font-extrabold text-teal-400">
                  ₹{indPriceRange.low.toLocaleString("en-IN")} – ₹{indPriceRange.high.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-slate-400">Turnaround</p>
                <p className="font-mono text-xs font-bold text-slate-200">{indPriceRange.days} days</p>
              </div>
            </div>
          </div>

          <Link
            href={indRfqLink}
            className="btn-primary w-full justify-center gap-2 py-3 text-xs font-bold shadow-lg shadow-teal-600/25"
          >
            <span>Post Industrial Requirement</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}

      {/* Trust pill footer */}
      <div className="mt-3.5 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium border-t border-slate-800/60 pt-2.5">
        <ShieldCheck className="size-3.5 text-teal-400" />
        <span>100% Milestone Safe · Guaranteed On-Time Delivery</span>
      </div>
    </div>
  );
}
