"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  Coins,
  Cpu,
  Layers,
  Sparkles,
  Wrench,
  Zap
} from "lucide-react";

type EstimatorMode = "fabrication" | "cnc" | "service";

// Fabrication Material Rates (INR / kg approx average in Indian Industrial Hubs)
const fabricationMaterials = [
  { id: "ms", label: "Mild Steel (IS 2062 / Structural)", baseRate: 85, leadDaysPerTon: 4 },
  { id: "ss304", label: "Stainless Steel (SS 304 Food/Dairy)", baseRate: 260, leadDaysPerTon: 6 },
  { id: "ss316", label: "Stainless Steel (SS 316 Chemical/Pharma)", baseRate: 380, leadDaysPerTon: 7 },
  { id: "al", label: "Aluminum (6061 / 5052)", baseRate: 310, leadDaysPerTon: 5 }
];

const fabricationComplexities = [
  { id: "simple", label: "Simple (Tanks, Base Frames, Sheds)", multiplier: 1.15, daysAdd: 2 },
  { id: "medium", label: "Medium (Ducting, Hoppers, Chutes)", multiplier: 1.35, daysAdd: 5 },
  { id: "high", label: "High (Tight Tolerances, Pressure Enclosures)", multiplier: 1.65, daysAdd: 9 }
];

const fabricationFinishes = [
  { id: "primer", label: "Red Oxide / Zinc Chromate Primer", costPerKg: 8 },
  { id: "epoxy", label: "Industrial Epoxy Coating (PU Paint)", costPerKg: 22 },
  { id: "galvanized", label: "Hot Dip Galvanized (HDG)", costPerKg: 38 },
  { id: "passivated", label: "Pickling & Passivation (SS)", costPerKg: 18 }
];

// CNC Machining Rates
const cncMaterials = [
  { id: "al", label: "Aluminum 6061", basePerPart: 350 },
  { id: "ms", label: "Mild Steel / EN8 / EN9", basePerPart: 420 },
  { id: "ss", label: "Stainless Steel 304 / 316", basePerPart: 680 },
  { id: "brass", label: "Brass / Bronze", basePerPart: 750 },
  { id: "delrin", label: "Engineering Plastic (Delrin/POM)", basePerPart: 320 }
];

const cncTolerances = [
  { id: "standard", label: "Standard (±0.1 mm / Commercial)", multiplier: 1.0 },
  { id: "fine", label: "Fine (±0.02 mm / Precision VMC)", multiplier: 1.3 },
  { id: "precision", label: "High Precision (±0.005 mm / Tool Room)", multiplier: 1.7 }
];

// Site Services Rates
const siteServices = [
  { id: "mechanical", label: "Machine Mechanical Breakdown / Alignment", minRate: 1500, maxRate: 2800 },
  { id: "electrical", label: "Electrical Control Panel / VFD Fault", minRate: 1200, maxRate: 2500 },
  { id: "ac", label: "Industrial AC / 5TR Package Chiller Service", minRate: 1500, maxRate: 3500 },
  { id: "welder", label: "Certified Welder with Portable Rig (Day)", minRate: 1800, maxRate: 2800 },
  { id: "pump", label: "Pump, Motor & Compressor Overhaul", minRate: 2000, maxRate: 4000 }
];

const serviceUrgencies = [
  { id: "normal", label: "Normal (Scheduled 24–48h)", multiplier: 1.0, sla: "24–48 Hours" },
  { id: "urgent", label: "Urgent (Same-Day Visit)", multiplier: 1.25, sla: "4–8 Hours" },
  { id: "emergency", label: "Emergency Breakdown (< 4h)", multiplier: 1.5, sla: "2–4 Hours" }
];

function formatRupee(amount: number) {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

export function IndustrialCostEstimator() {
  const [mode, setMode] = useState<EstimatorMode>("fabrication");

  // Fabrication state
  const [fabMaterial, setFabMaterial] = useState(fabricationMaterials[0].id);
  const [fabWeight, setFabWeight] = useState(500);
  const [fabComplexity, setFabComplexity] = useState(fabricationComplexities[0].id);
  const [fabFinish, setFabFinish] = useState(fabricationFinishes[0].id);

  // CNC state
  const [cncMat, setCncMat] = useState(cncMaterials[0].id);
  const [cncQty, setCncQty] = useState(25);
  const [cncTol, setCncTol] = useState(cncTolerances[0].id);

  // Service state
  const [serviceType, setServiceType] = useState(siteServices[0].id);
  const [serviceUrgency, setServiceUrgency] = useState(serviceUrgencies[0].id);

  // Fabrication computation
  const fabEstimate = useMemo(() => {
    const mat = fabricationMaterials.find((m) => m.id === fabMaterial) || fabricationMaterials[0];
    const comp = fabricationComplexities.find((c) => c.id === fabComplexity) || fabricationComplexities[0];
    const fin = fabricationFinishes.find((f) => f.id === fabFinish) || fabricationFinishes[0];

    const rawCost = fabWeight * mat.baseRate;
    const fabCost = rawCost * comp.multiplier;
    const finishCost = fabWeight * fin.costPerKg;
    const totalMid = fabCost + finishCost;

    const low = totalMid * 0.92;
    const high = totalMid * 1.12;

    const tons = Math.max(1, Math.ceil(fabWeight / 1000));
    const leadDays = Math.max(5, tons * mat.leadDaysPerTon + comp.daysAdd);

    return {
      materialLabel: mat.label,
      weight: fabWeight,
      low,
      high,
      leadDays,
      lowFormatted: formatRupee(low),
      highFormatted: formatRupee(high),
      perKgRate: Math.round(totalMid / fabWeight)
    };
  }, [fabMaterial, fabWeight, fabComplexity, fabFinish]);

  // CNC computation
  const cncEstimate = useMemo(() => {
    const mat = cncMaterials.find((m) => m.id === cncMat) || cncMaterials[0];
    const tol = cncTolerances.find((t) => t.id === cncTol) || cncTolerances[0];

    // Volume discount factor
    let qtyFactor = 1.0;
    if (cncQty <= 5) qtyFactor = 1.4; // prototype setup premium
    else if (cncQty <= 20) qtyFactor = 1.1;
    else if (cncQty >= 100) qtyFactor = 0.85;

    const perPartMid = mat.basePerPart * tol.multiplier * qtyFactor;
    const totalMid = perPartMid * cncQty;

    const low = totalMid * 0.9;
    const high = totalMid * 1.15;
    const partLow = perPartMid * 0.9;
    const partHigh = perPartMid * 1.15;

    const leadDays = cncQty <= 10 ? "4–6 Days" : cncQty <= 50 ? "7–10 Days" : "12–16 Days";

    return {
      materialLabel: mat.label,
      qty: cncQty,
      low,
      high,
      lowFormatted: formatRupee(low),
      highFormatted: formatRupee(high),
      partLowFormatted: formatRupee(partLow),
      partHighFormatted: formatRupee(partHigh),
      leadDays
    };
  }, [cncMat, cncQty, cncTol]);

  // Service computation
  const serviceEstimate = useMemo(() => {
    const serv = siteServices.find((s) => s.id === serviceType) || siteServices[0];
    const urg = serviceUrgencies.find((u) => u.id === serviceUrgency) || serviceUrgencies[0];

    const low = serv.minRate * urg.multiplier;
    const high = serv.maxRate * urg.multiplier;

    return {
      serviceLabel: serv.label,
      lowFormatted: formatRupee(low),
      highFormatted: formatRupee(high),
      sla: urg.sla,
      urgencyLabel: urg.label
    };
  }, [serviceType, serviceUrgency]);

  // Hand-off URLs
  const rfqHrefFromFab = useMemo(() => {
    const params = new URLSearchParams({
      serviceType: "Fabrication",
      materialType: fabEstimate.materialLabel,
      quantity: `${fabEstimate.weight} kg`,
      budgetRange: `${fabEstimate.lowFormatted} - ${fabEstimate.highFormatted}`,
      projectTitle: `${fabEstimate.materialLabel} Fabrication (${fabEstimate.weight} kg)`,
      description: `Requirement for ${fabEstimate.materialLabel} fabrication, approx weight ${fabEstimate.weight} kg. Estimated budget bracket: ${fabEstimate.lowFormatted} - ${fabEstimate.highFormatted}. Expected turnaround: ${fabEstimate.leadDays} days.`
    });
    return `/customer/request/new?${params.toString()}`;
  }, [fabEstimate]);

  const rfqHrefFromCnc = useMemo(() => {
    const params = new URLSearchParams({
      serviceType: "CNC Machining",
      materialType: cncEstimate.materialLabel,
      quantity: `${cncEstimate.qty} Units`,
      budgetRange: `${cncEstimate.lowFormatted} - ${cncEstimate.highFormatted}`,
      projectTitle: `CNC Machined Parts in ${cncEstimate.materialLabel} (${cncEstimate.qty} pcs)`,
      description: `Requirement for precision CNC machining of ${cncEstimate.qty} parts in ${cncEstimate.materialLabel}. Target budget bracket: ${cncEstimate.lowFormatted} - ${cncEstimate.highFormatted} (${cncEstimate.partLowFormatted} - ${cncEstimate.partHighFormatted} / part).`
    });
    return `/customer/request/new?${params.toString()}`;
  }, [cncEstimate]);

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
            <Sparkles className="size-3.5 text-teal-600" />
            Live Market Index · Q2 2026
          </div>
          <h2 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
            Industrial Cost & Turnaround Estimator
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Instant indicative pricing calculated from Indian industrial clusters (MSME & MIDC benchmarks).
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setMode("fabrication")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 transition ${
              mode === "fabrication" ? "bg-white text-teal-700 shadow-2xs" : "hover:text-slate-900"
            }`}
          >
            <Layers className="size-3.5" />
            <span>Fabrication</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("cnc")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 transition ${
              mode === "cnc" ? "bg-white text-teal-700 shadow-2xs" : "hover:text-slate-900"
            }`}
          >
            <Cpu className="size-3.5" />
            <span>CNC / Precision</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("service")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 transition ${
              mode === "service" ? "bg-white text-teal-700 shadow-2xs" : "hover:text-slate-900"
            }`}
          >
            <Wrench className="size-3.5" />
            <span>Field Visit</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        {/* Left Form Controls (7 cols) */}
        <div className="lg:col-span-7 grid gap-5">
          {mode === "fabrication" && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Material Grade
                </label>
                <select
                  value={fabMaterial}
                  onChange={(e) => setFabMaterial(e.target.value)}
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                >
                  {fabricationMaterials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Estimated Total Weight (kg)
                  </label>
                  <span className="text-sm font-black text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                    {fabWeight.toLocaleString("en-IN")} kg ({ (fabWeight / 1000).toFixed(2) } MT)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={fabWeight}
                  onChange={(e) => setFabWeight(Number(e.target.value))}
                  className="mt-3 w-full accent-teal-600 cursor-pointer"
                />
                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <span>50 kg (Small frame)</span>
                  <span>1,000 kg (1 Ton)</span>
                  <span>5,000 kg (5 Ton)</span>
                  <span>10,000 kg (Heavy)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Job Complexity & Engineering
                </label>
                <div className="mt-1.5 grid gap-2 sm:grid-cols-3">
                  {fabricationComplexities.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFabComplexity(c.id)}
                      className={`rounded-xl border p-2.5 text-left transition ${
                        fabComplexity === c.id
                          ? "border-teal-600 bg-teal-50/50 text-teal-950 ring-2 ring-teal-600/20 font-bold"
                          : "border-slate-200 bg-slate-50/40 text-slate-700 hover:bg-slate-100 text-xs"
                      }`}
                    >
                      <div className="text-xs font-bold">{c.label.split("(")[0]}</div>
                      <div className="text-[10px] text-slate-500 font-normal truncate mt-0.5">
                        {c.label.includes("(") ? c.label.split("(")[1].replace(")", "") : ""}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. Surface Treatment & Coating
                </label>
                <select
                  value={fabFinish}
                  onChange={(e) => setFabFinish(e.target.value)}
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                >
                  {fabricationFinishes.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label} (+₹{f.costPerKg}/kg)
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {mode === "cnc" && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Raw Stock Material
                </label>
                <select
                  value={cncMat}
                  onChange={(e) => setCncMat(e.target.value)}
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                >
                  {cncMaterials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Batch Quantity
                  </label>
                  <span className="text-sm font-black text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                    {cncQty} Pieces
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={cncQty}
                  onChange={(e) => setCncQty(Number(e.target.value))}
                  className="mt-3 w-full accent-teal-600 cursor-pointer"
                />
                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <span>1 (Prototype)</span>
                  <span>25 (Batch)</span>
                  <span>100 (Production)</span>
                  <span>500 (Volume)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Precision & Tolerance Class
                </label>
                <div className="mt-1.5 grid gap-2 sm:grid-cols-3">
                  {cncTolerances.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCncTol(t.id)}
                      className={`rounded-xl border p-2.5 text-left transition ${
                        cncTol === t.id
                          ? "border-teal-600 bg-teal-50/50 text-teal-950 ring-2 ring-teal-600/20 font-bold"
                          : "border-slate-200 bg-slate-50/40 text-slate-700 hover:bg-slate-100 text-xs"
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label.split("(")[0]}</div>
                      <div className="text-[10px] text-slate-500 font-normal truncate mt-0.5">
                        {t.label.includes("(") ? t.label.split("(")[1].replace(")", "") : ""}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {mode === "service" && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Service Breakdown Category
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                >
                  {siteServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Dispatch Urgency
                </label>
                <div className="mt-1.5 grid gap-2 sm:grid-cols-3">
                  {serviceUrgencies.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setServiceUrgency(u.id)}
                      className={`rounded-xl border p-2.5 text-left transition ${
                        serviceUrgency === u.id
                          ? "border-teal-600 bg-teal-50/50 text-teal-950 ring-2 ring-teal-600/20 font-bold"
                          : "border-slate-200 bg-slate-50/40 text-slate-700 hover:bg-slate-100 text-xs"
                      }`}
                    >
                      <div className="text-xs font-bold">{u.label.split("(")[0]}</div>
                      <div className="text-[10px] text-teal-700 font-semibold mt-0.5">
                        SLA: {u.sla}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Output Summary Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/[0.06] via-white to-slate-50 p-6 shadow-md">
          <div className="grid gap-4">
            <div className="flex items-center justify-between border-b border-teal-200/60 pb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-900">
                <Calculator className="size-4 text-teal-600" />
                Benchmark Estimate
              </span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-full">
                Guaranteed Escrow
              </span>
            </div>

            {mode === "fabrication" && (
              <>
                <div>
                  <span className="text-xs font-semibold text-slate-500">Indicative Budget Bracket</span>
                  <div className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
                    {fabEstimate.lowFormatted} – {fabEstimate.highFormatted}
                  </div>
                  <span className="mt-0.5 block text-xs font-medium text-slate-600">
                    Avg. ~₹{fabEstimate.perKgRate}/kg (Includes Steel + Fabrication + Primer)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-3xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Estimated Lead Time</span>
                    <div className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-900">
                      <Clock className="size-3.5 text-teal-600" />
                      <span>{fabEstimate.leadDays} Days</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-3xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Quotes Expected</span>
                    <div className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-900">
                      <Coins className="size-3.5 text-teal-600" />
                      <span>3–5 Bids</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-slate-500">
                  Exact bids depend on CAD drawings, scrap recovery, and welding inspection specs (MTC / DPT).
                </p>

                <div className="mt-2">
                  <Link
                    href={rfqHrefFromFab}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700"
                  >
                    <span>Apply Estimate & Post RFQ</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </>
            )}

            {mode === "cnc" && (
              <>
                <div>
                  <span className="text-xs font-semibold text-slate-500">Total Batch Estimate</span>
                  <div className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
                    {cncEstimate.lowFormatted} – {cncEstimate.highFormatted}
                  </div>
                  <span className="mt-0.5 block text-xs font-medium text-slate-600">
                    ~{cncEstimate.partLowFormatted} – {cncEstimate.partHighFormatted} / part
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-3xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Turnaround</span>
                    <div className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-900">
                      <Clock className="size-3.5 text-teal-600" />
                      <span>{cncEstimate.leadDays}</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-3xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Tolerance Check</span>
                    <div className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-900">
                      <CheckCircle2 className="size-3.5 text-teal-600" />
                      <span>CMM / Gauge</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <Link
                    href={rfqHrefFromCnc}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700"
                  >
                    <span>Apply Estimate & Post RFQ</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </>
            )}

            {mode === "service" && (
              <>
                <div>
                  <span className="text-xs font-semibold text-slate-500">Diagnostic Visit Charge Bracket</span>
                  <div className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
                    {serviceEstimate.lowFormatted} – {serviceEstimate.highFormatted}
                  </div>
                  <span className="mt-0.5 block text-xs font-medium text-slate-600">
                    Includes technician on-site diagnostic & fault assessment
                  </span>
                </div>

                <div className="rounded-xl border border-teal-200 bg-white p-3.5 shadow-3xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Response SLA</span>
                  <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-teal-800">
                    <Zap className="size-4 text-teal-600" />
                    <span>{serviceEstimate.sla} Dispatch Guaranteed</span>
                  </div>
                </div>

                <div className="mt-2">
                  <Link
                    href="/customer/quick-booking/new"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700"
                  >
                    <span>Book Service Visit Now</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 border-t border-slate-200/70 pt-3 text-[11px] text-slate-400 text-center">
            Zero commitment · 100% Escrow Protection on final project award
          </div>
        </div>
      </div>
    </div>
  );
}
