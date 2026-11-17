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
    <div className="bg-slate-50 min-h-screen">
      <Header />

      {/* Hero Section - Executive Navy Anchor */}
      <section
        className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 border-b border-slate-800 text-white"
        style={{
          background: "linear-gradient(180deg, #07131F 0%, #0B1D2F 60%, #0E243A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,196,204,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,204,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="page-shell relative z-10">
          <div className="max-w-3xl grid gap-4">
            <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/30">
              Operations &amp; Engineering Support
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Talk to Our Manufacturing Operations Desk.
            </h1>
            <p className="text-base leading-relaxed text-slate-300">
              Have an engineering drawing (CAD/STEP/PDF) that needs review, require a factory audit for your machine shop, or have an urgent plant breakdown? Our engineers are on call.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area - Light Slate */}
      <section className="page-shell py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Left: Contact Info & Operational Hubs */}
          <div className="grid gap-6">
            {/* SLA & Direct Channel Strip */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-teal-600 text-xs font-bold">
                  <Clock className="size-4" />
                  <span>RFQ Review SLA</span>
                </div>
                <p className="mt-2 text-xl font-black text-slate-900">&lt; 2 Hours</p>
                <p className="text-xs text-slate-500 mt-0.5">Engineering drawing &amp; tolerance review</p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
                  <PhoneCall className="size-4" />
                  <span>Emergency Dispatch</span>
                </div>
                <p className="mt-2 text-xl font-black text-slate-900">&lt; 30 Minutes</p>
                <p className="text-xs text-slate-500 mt-0.5">Technician assignment to plant gate</p>
              </div>
            </div>

            {/* Direct WhatsApp Hotline */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                  <MessageSquare className="size-4 text-emerald-600" />
                  <span>Direct WhatsApp Operations Hotline</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold border border-emerald-200">
                  ACTIVE
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-800 font-medium">
                WhatsApp CAD drawings directly to our engineering coordination lead:
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/919876543210?text=Hello%20RKISPro%2C%20I%20have%20an%20industrial%20drawing%20requirement%20for%20review."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 min-h-[44px]"
                >
                  <MessageSquare className="size-4" />
                  <span>Chat on WhatsApp (+91 98765 43210)</span>
                </a>
                <a
                  href="mailto:procurement@rkispro.com"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-teal-700 min-h-[44px]"
                >
                  <Mail className="size-3.5 text-teal-600" />
                  <span>procurement@rkispro.com</span>
                </a>
              </div>
            </div>

            {/* Physical Desks */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                Physical Operational Desks
              </p>
              <div className="grid gap-3">
                {operationsDesks.map((d) => (
                  <div
                    key={d.hub}
                    className="rounded-xl border border-slate-200/90 bg-white p-4 text-xs shadow-sm"
                  >
                    <div className="flex items-center justify-between text-slate-900 font-bold">
                      <span>{d.hub}</span>
                      <span className="text-teal-700 text-[11px] font-mono bg-teal-50 px-2 py-0.5 rounded border border-teal-200">{d.city}</span>
                    </div>
                    <p className="mt-1 text-slate-600">{d.address}</p>
                    <p className="mt-1 text-[11px] text-teal-700 font-medium">Specialty: {d.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div
            className="rounded-3xl p-6 sm:p-8 border border-slate-200/90 bg-white shadow-md"
          >
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Direct Requirement Inquiry
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Submit Technical Scope
              </h2>
              <p className="text-xs text-slate-500 mt-1">
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

              <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
                Requirement Type
                <select
                  name="inquiryType"
                  className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-teal-600"
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

              <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-3 text-[11px] text-teal-800 flex items-center gap-2">
                <ShieldCheck className="size-4 text-teal-600 shrink-0" />
                <span>CAD files and proprietary drawings are covered under strict mutual NDA.</span>
              </div>

              <Button type="submit" className="w-full py-3.5 text-sm font-bold mt-2">
                Dispatch Message to Operations
              </Button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}