import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/landing/FooterSection";
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Factory,
  MapPin,
} from "lucide-react";

const comparisonPillars = [
  {
    problem: "20+ persistent telecaller spam calls within hours of posting on open directories.",
    solution: "Zero spam calls. Your engineering drawings are shared strictly with 3–5 pre-audited machine shops under NDA.",
    icon: Lock,
  },
  {
    problem: "Zero verification of machine bed travel, crane ratings, or power backup—leading to unauthorized third-party subcontracts.",
    solution: "On-site physical factory audit of machine make, axis travels (X/Y/Z), lathe swing, and power sanctions.",
    icon: Building2,
  },
  {
    problem: "Buyers take 100% of scrap and dimensional error risks with unrecoverable upfront wire transfers.",
    solution: "Milestone Nodal Escrow: Payments locked securely and released in tranches only after quality checkpoint sign-offs.",
    icon: ShieldCheck,
  },
  {
    problem: "Unverified mill materials and missing MTCs cause premature structural failure and GST ITC credit blockages.",
    solution: "Primary mill steel traceability (Tata/SAIL/Jindal) with EN 10204 3.1 MTCs and automated CBIC GST tax invoices.",
    icon: FileCheck2,
  },
];

const industrialClusters = [
  {
    name: "Pune Industrial Corridor",
    hubs: "MIDC Bhosari, Chakan, Talwade & Pimpri",
    specialty: "Heavy Structural Fabrication, Sheet Metal Laser, Press Bending & Automotive Tooling",
  },
  {
    name: "Bengaluru Machine Hub",
    hubs: "Peenya Industrial Area, Bommasandra & Whitefield",
    specialty: "Precision 4-Axis CNC Machining, VMC Milling, Aerospace & Defence Enclosures",
  },
  {
    name: "Gujarat Chemical & Industrial Zone",
    hubs: "Sanand GIDC, Ankleshwar & Vatva",
    specialty: "SS 304/316 Sanitary Tanks, Chemical Process Vessels & Orbital TIG Welded Piping",
  },
  {
    name: "Central & Eastern Mining Belt",
    hubs: "Urla Industrial Area (Raipur), Bhilai & Bilaspur",
    specialty: "Heavy Mill Liners, Gantry Girders, Mining Skids & Emergency In-Situ Line Boring",
  },
  {
    name: "Tamil Nadu Engineering Cluster",
    hubs: "Ambattur, Sriperumbudur & Coimbatore",
    specialty: "Precision Turned Shafts, Hydraulic Valve Manifolds & High-Volume Turned Parts",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#04090E", minHeight: "100vh" }}>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-slate-800/80">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
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
                The RKISPro Operating System
              </span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Engineered for Trust.{" "}
              <span className="text-gradient-teal">Built for Shop Floors.</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-300">
              RKISPro is India&apos;s managed B2B industrial procurement marketplace. We replace unvetted phone directories, blind advance transfers, and scrap disputes with audited factory matching, milestone escrow protection, and 100% material test certificate (MTC) verification.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/customer/request/new" className="btn-primary gap-2 text-sm font-bold px-6 py-3">
                <span>Post Requirement (RFQ)</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/customer/vendors"
                className="btn-secondary gap-2 text-sm font-semibold px-5 py-3 border border-slate-700 hover:border-teal-500/40"
              >
                <Factory className="size-4 text-teal-400" />
                <span>Browse Audited Workshops</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built RKISPro: The Problem vs Solution */}
      <section className="page-shell py-16 sm:py-20 border-b border-slate-800/80">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-teal-400" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-400">
              The Procurement Problem
            </p>
          </div>
          <h2 className="font-display mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Why Traditional B2B Directories Fail Indian Factories
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Open directories are lead brokers that prioritize whoever pays for top ad banners. Engineering procurement requires technical verification, drawing confidentiality, and payment security.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {comparisonPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                    <span className="text-xs font-bold font-mono text-slate-500 uppercase">
                      Pillar 0{idx + 1}
                    </span>
                    <div className="flex size-9 items-center justify-center rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <div className="rounded-full bg-rose-500/10 p-1 text-rose-400 shrink-0 mt-0.5">
                      <AlertTriangle className="size-3.5" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-rose-300 block mb-0.5">Traditional Directory:</strong>
                      {pillar.problem}
                    </p>
                  </div>

                  <div className="mt-4 flex items-start gap-3 pt-3 border-t border-slate-800/60">
                    <div className="rounded-full bg-teal-500/10 p-1 text-teal-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      <strong className="text-teal-400 block mb-0.5">RKISPro Operating Standard:</strong>
                      {pillar.solution}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Industrial Footprint & Clusters */}
      <section className="page-shell py-16 sm:py-20 border-b border-slate-800/80">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-teal-400" />
              <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-400">
                Industrial Footprint
              </p>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Audited Clusters Across India&apos;s Manufacturing Belts
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Workshops in our managed network are located in major manufacturing zones with verified logistical access.
            </p>
          </div>

          <Link
            href="/customer/vendors"
            className="inline-flex items-center gap-2 rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-2.5 text-xs font-bold text-teal-300 transition hover:bg-teal-500/20"
          >
            <MapPin className="size-4 text-teal-400" />
            <span>Search Workshops by City Cluster</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industrialClusters.map((cluster) => (
            <div
              key={cluster.name}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-teal-500/40 hover:bg-slate-900/70"
            >
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
                <MapPin className="size-3.5" />
                <span>{cluster.name}</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-white">
                {cluster.hubs}
              </p>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-2">
                {cluster.specialty}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Gate Quality Commitment */}
      <section className="page-shell py-16 sm:py-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-teal-400">
              Quality Commitment
            </span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-extrabold text-white">
              Every Work Order is Supervised by an RKISPro Manufacturing Engineer
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              When you post an industrial requirement, an RKISPro operations engineer reviews tolerances, clarifies raw material specifications, audits quotes, and confirms quality sign-offs before customer payments are released from escrow.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
              <span className="font-mono text-xs font-bold text-teal-400">Gate 01</span>
              <h3 className="mt-2 text-sm font-bold text-white">Raw Material MTC</h3>
              <p className="mt-1 text-xs text-slate-400">Traceability to primary mill heat numbers.</p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
              <span className="font-mono text-xs font-bold text-teal-400">Gate 02</span>
              <h3 className="mt-2 text-sm font-bold text-white">Dimensional CMM</h3>
              <p className="mt-1 text-xs text-slate-400">Verification against 2D/3D CAD tolerances.</p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
              <span className="font-mono text-xs font-bold text-teal-400">Gate 03</span>
              <h3 className="mt-2 text-sm font-bold text-white">Weld NDT &amp; Hydro</h3>
              <p className="mt-1 text-xs text-slate-400">DPT, ultrasonic, and pressure leak checks.</p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
              <span className="font-mono text-xs font-bold text-teal-400">Gate 04</span>
              <h3 className="mt-2 text-sm font-bold text-white">Surface DFT &amp; Gate Pass</h3>
              <p className="mt-1 text-xs text-slate-400">Paint micron thickness &amp; transport Lorry Receipt.</p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}