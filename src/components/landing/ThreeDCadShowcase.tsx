"use client";

import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  FileText,
  Hammer,
  HelpCircle,
  Layers,
  MessageSquare,
  Ruler,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";

export function ThreeDCadShowcase() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  return (
    <section className="py-16 sm:py-20 bg-slate-900 border-t border-b border-slate-800 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-15"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,196,204,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="page-shell relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-end pb-10 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-teal-400">
                Simple &amp; Accessible Metal Work
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              3 Easy Ways to Order.{" "}
              <span className="text-teal-400">No Complex Software Needed.</span>
            </h2>
          </div>
          <div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you are a homeowner, shopkeeper, plant manager, or engineer—getting metal work done is simple. We accept everything from hand-drawn paper sketches to CAD models.
            </p>
          </div>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Card 1: Hand-Drawn Sketch / Mobile Photo */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col justify-between hover:border-teal-500/40 transition">
            <div>
              <div className="size-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5">
                <Camera className="size-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                Option 01 · Most Popular
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Hand-Drawn Sketch or Photo
              </h3>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Draw your gate, railing, custom frame, bracket, or any specific metal idea on paper with rough dimensions. Or snap a photo of an existing piece. Upload it or send on WhatsApp.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-teal-400" />
                  <span>No CAD knowledge needed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-teal-400" />
                  <span>Verified local quote in 2–4 hours</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <Link
                href="/customer/request/new?serviceType=Fabrication"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-teal-500 transition"
              >
                <span>Upload Sketch / Photo</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: On-Site Measurement or Physical Sample */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col justify-between hover:border-teal-500/40 transition">
            <div>
              <div className="size-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                <Ruler className="size-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Option 02 · Full Service
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Physical Sample or Site Visit
              </h3>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                Need a shed roof, balcony railing, or staircase fitted? We arrange a verified local fabricator to visit your location, take exact measurements, and provide a fixed quote.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-amber-400" />
                  <span>Available in Bilaspur, Raipur, Pune</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-amber-400" />
                  <span>Physical sample reverse-engineering</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <Link
                href="/customer/quick-booking/new"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition"
              >
                <span>Book On-Site Measurement</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Engineering CAD / 2D Drawings */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col justify-between hover:border-teal-500/40 transition">
            <div>
              <div className="size-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                <Layers className="size-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                Option 03 · For Industrial Buyers
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Technical CAD / STEP / PDF Drawings
              </h3>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                For manufacturing plants and machine builders with technical engineering drawings. We match your drawings with certified machine shops with verified spindle capacity.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-blue-400" />
                  <span>STEP, DXF, DWG, PDF supported</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-blue-400" />
                  <span>Interactive 3D viewer available</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
              <Link
                href="/customer/request/new?serviceType=Machining"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:border-teal-500/40 transition"
              >
                <span>Upload Technical CAD / Drawing</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/cad-lab"
                className="text-center text-[11px] text-teal-400 hover:text-teal-300 font-semibold py-1"
              >
                Launch Interactive 3D CAD Lab &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Milestone guarantee strip */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
              <Shield className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">100% Payment &amp; Delivery Protection</p>
              <p className="text-xs text-slate-400">
                Never lose your advance payment to unverified contractors. Funds are disbursed in milestones as work is completed.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%20RKISPro%2C%20I%20want%20to%20get%20some%20metal%20work%20fabricated.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md shadow-emerald-700/20"
            >
              <MessageSquare className="size-3.5" />
              <span>Direct WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
