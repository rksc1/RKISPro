import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/landing/FooterSection";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

const operationsDesks = [
  {
    hub: "West Region Operations",
    city: "Pune, Maharashtra",
    address: "MIDC Bhosari Industrial Area, Sector 7",
    focus: "Structural Fabrication, Sheet Metal & Automotive Machining",
  },
  {
    hub: "South Region Operations",
    city: "Bengaluru, Karnataka",
    address: "Peenya Industrial Area, Phase II",
    focus: "Precision 4-Axis CNC Machining, VMC & Aerospace Enclosures",
  },
  {
    hub: "Central Region Operations",
    city: "Raipur, Chhattisgarh",
    address: "Urla Industrial Growth Centre",
    focus: "Heavy Gantry Skids, Cement Mill Liners & In-Situ Line Boring",
  },
];

export default function ContactPage() {
  return (
    <div style={{ background: "#04090E", minHeight: "100vh" }}>
      <Header />

      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,196,204,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,204,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="page-shell relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            {/* Left: Contact Info & Operational Hubs */}
            <div className="grid gap-8">
              <div className="grid gap-4">
                <span className="section-label">Operations &amp; Engineering Support</span>
                <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                  Talk to Our Manufacturing Operations Desk.
                </h1>
                <p className="text-base leading-relaxed text-slate-300">
                  Have an engineering drawing (CAD/STEP/PDF) that needs review, require a factory audit for your machine shop, or have an urgent plant breakdown? Our engineers are on call.
                </p>
              </div>

              {/* SLA & Direct Channel Strip */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
                    <Clock className="size-4" />
                    <span>RFQ Review SLA</span>
                  </div>
                  <p className="mt-2 text-lg font-black text-white">&lt; 2 Hours</p>
                  <p className="text-[11px] text-slate-400">Engineering drawing &amp; tolerance review</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <PhoneCall className="size-4" />
                    <span>Emergency Dispatch</span>
                  </div>
                  <p className="mt-2 text-lg font-black text-white">&lt; 30 Minutes</p>
                  <p className="text-[11px] text-slate-400">Technician assignment to plant gate</p>
                </div>
              </div>

              {/* Direct WhatsApp Hotline */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <MessageSquare className="size-4" />
                    <span>Direct WhatsApp Operations Hotline</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                    ACTIVE
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-200 font-medium">
                  WhatsApp CAD drawings directly to our engineering coordination lead:
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="https://wa.me/919876543210?text=Hello%20RKISPro%2C%20I%20have%20an%20industrial%20drawing%20requirement%20for%20review."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-500"
                  >
                    <MessageSquare className="size-4" />
                    <span>Chat on WhatsApp (+91 98765 43210)</span>
                  </a>
                  <a
                    href="mailto:procurement@rkispro.com"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    <Mail className="size-3.5 text-teal-400" />
                    <span>procurement@rkispro.com</span>
                  </a>
                </div>
              </div>

              {/* Physical Desks */}
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                  Physical Operational Desks
                </p>
                <div className="grid gap-3">
                  {operationsDesks.map((d) => (
                    <div
                      key={d.hub}
                      className="rounded-xl border border-slate-800 bg-slate-900/30 p-3.5 text-xs text-slate-300"
                    >
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>{d.hub}</span>
                        <span className="text-teal-400 text-[11px] font-mono">{d.city}</span>
                      </div>
                      <p className="mt-1 text-slate-400">{d.address}</p>
                      <p className="mt-1 text-[11px] text-teal-400/80">Specialty: {d.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div
              className="rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/60 shadow-2xl"
              style={{
                boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="border-b border-slate-800 pb-4 mb-6">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Direct Requirement Inquiry
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  Submit Technical Scope
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Our manufacturing engineer will review specs and connect with you within 2 hours.
                </p>
              </div>

              <form className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Your Name" name="name" placeholder="e.g. Rajesh Sharma" required />
                  <Input label="Enterprise / Company Name" name="company" placeholder="e.g. Precision Engineering Ltd" required />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Business Email" name="email" type="email" placeholder="you@company.com" required />
                  <Input label="Mobile / WhatsApp Number" name="phone" type="tel" placeholder="+91 98XXX XXXXX" required />
                </div>

                <label className="grid gap-1.5 text-sm font-semibold text-slate-200">
                  Requirement Type
                  <select
                    name="inquiryType"
                    className="min-h-11 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none focus:border-teal-500"
                  >
                    <option value="rfq">CAD Drawing / RFQ Bidding</option>
                    <option value="breakdown">Emergency Factory Breakdown Service (&lt; 4h)</option>
                    <option value="vendor_audit">Machine Shop Partner Application</option>
                    <option value="billing">GST Tax Invoice / Milestone Escrow Query</option>
                  </select>
                </label>

                <Textarea
                  label="Technical Specifications / Part Details"
                  name="message"
                  rows={4}
                  placeholder="Mention material grade (e.g. MS IS 2062, SS 304, EN19), quantity, required tolerances, and plant location..."
                  required
                />

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-teal-400 shrink-0" />
                  <span>CAD files and proprietary drawings are covered under strict mutual NDA.</span>
                </div>

                <Button type="submit" className="w-full py-3 text-sm font-bold mt-2">
                  Dispatch Message to Operations
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}