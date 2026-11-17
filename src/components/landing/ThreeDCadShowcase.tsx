"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Box, Cpu, FileCheck, Shield, Sparkles } from "lucide-react";

// Dynamically import the WebGL 3D viewer to ensure zero SSR hydration issues and instant page loads
const CadPartViewer = dynamic(
  () => import("@/components/3d/CadPartViewer").then((mod) => mod.CadPartViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] sm:h-[600px] rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center gap-3">
        <div className="size-10 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
        <p className="font-mono text-xs text-teal-400 uppercase tracking-widest">
          Initializing 3D CAD WebGL Engine...
        </p>
      </div>
    ),
  }
);

export function ThreeDCadShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-slate-900 border-t border-b border-slate-800 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-15"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,196,204,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="page-shell relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-end pb-12 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-teal-400">
                Digital Engineering &amp; Metrology
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Interactive 3D CAD Inspector.{" "}
              <span className="text-teal-400">From STEP File to Physical Part.</span>
            </h2>
          </div>
          <div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Experience the RKISPro digital pipeline. When you upload a 2D drawing or 3D CAD model, our automated engineering kernel calculates machine toolpaths, verifies critical GD&amp;T tolerances, and assigns qualified 5-axis CNC centers.
            </p>
            <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Box className="size-3.5 text-teal-400" />
                STEP / IGES / DXF
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="size-3.5 text-teal-400" />
                5-Axis CAM Simulation
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="size-3.5 text-teal-400" />
                MTC ISO 10204 3.1
              </span>
            </div>
          </div>
        </div>

        {/* 3D Viewer Workbench Container */}
        <div className="mt-10 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Main 3D Interactive Viewport */}
          <div>
            <CadPartViewer />
            <p className="mt-3 text-center sm:text-left text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="size-3.5 text-teal-400" />
              <span>
                <strong>Click &amp; drag to rotate 360° in 3D</strong>. Switch render modes or change alloy finishes in real time.
              </span>
            </p>
          </div>

          {/* Right: Technical Inspection Specification Sidebar */}
          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 backdrop-blur-md">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-1.5">
                <Shield className="size-3.5" />
                Quality Assurance Gates
              </p>
              <div className="space-y-3.5 text-xs">
                <div className="border-l-2 border-teal-500 pl-3">
                  <p className="font-bold text-white">Coordinate Measuring Machine (CMM)</p>
                  <p className="text-slate-400 mt-0.5">Zeiss 3D CMM probe inspection with automated calibration reports.</p>
                </div>
                <div className="border-l-2 border-teal-500 pl-3">
                  <p className="font-bold text-white">Primary Mill Certificates</p>
                  <p className="text-slate-400 mt-0.5">100% heat-number traceability to Tata, Jindal, or Sail mills.</p>
                </div>
                <div className="border-l-2 border-teal-500 pl-3">
                  <p className="font-bold text-white">Surface Metrology</p>
                  <p className="text-slate-400 mt-0.5">Contact profilometer testing for Ra 0.4 µm - 3.2 µm finishes.</p>
                </div>
              </div>
            </div>

            {/* Quick Post Drawing CTA */}
            <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950/40 via-slate-950 to-slate-950 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-300">
                Have a 3D Part to Fabricate?
              </p>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Upload your CAD files. Get standardized bids from verified machine shops within 24 hours.
              </p>
              <Link
                href="/customer/request/new"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3 text-xs font-bold text-slate-950 shadow-md transition hover:bg-teal-400 min-h-[44px]"
              >
                <span>Upload CAD Drawing for RFQ</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
