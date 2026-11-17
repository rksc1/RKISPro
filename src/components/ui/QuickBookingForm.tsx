"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Clock, FileImage, Info, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  formatQuickBookingServiceType,
  quickBookingServiceGroups,
  quickBookingUrgencies
} from "@/services/quick-booking-service";

function Section({ title, helper, children }: { title: string; helper: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div>
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h2>
        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{helper}</p>
      </div>
      {children}
    </section>
  );
}

const urgencyMeta: Record<string, { badge: string; desc: string }> = {
  normal: { badge: "Standard", desc: "Response within 24–48 hours" },
  urgent: { badge: "High Priority", desc: "Same-day response & site coordination" },
  emergency: { badge: "Immediate Dispatch", desc: "Critical breakdown support within 2–4 hours" }
};

export function QuickBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string>("normal");
  const [fileCount, setFileCount] = useState<number>(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/customer/quick-bookings", {
        body: formData,
        method: "POST"
      });

      if (response.redirected) {
        window.location.assign(response.url);
        return;
      }

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setError(payload?.error ?? "Unable to create quick booking. Please check required fields and try again.");
        return;
      }

      window.location.assign("/customer/quick-bookings");
    } catch {
      setError("Network connectivity error. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-5" encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
      {/* Informative Guidance Banner */}
      <div className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-4 text-sm leading-relaxed text-teal-950">
        <Info className="size-5 shrink-0 text-teal-600 mt-0.5" />
        <div>
          <strong className="font-semibold text-teal-900">RKISPro Quick Booking:</strong> Fast-track technical visits for urgent machine breakdowns, repairs, welder/mechanic dispatch, and on-site support.
          <p className="mt-1 text-xs text-teal-800">For multi-ton fabrication, CAD drawings, and milestone-based project quotes, please use the Managed RFQ flow instead.</p>
        </div>
      </div>

      {error ? (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          <AlertCircle className="size-5 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      ) : null}

      <Section
        title="1. Service Needed"
        helper="Choose the exact service so RKISPro can dispatch a vetted contractor or technician with the right tools."
      >
        <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
          Service category <span className="text-red-500">*</span>
          <select
            className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition-all duration-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
            name="serviceType"
            required
          >
            {quickBookingServiceGroups.map((group) => (
              <optgroup label={group.label} key={group.label}>
                {group.options.map((type) => (
                  <option key={type} value={type}>
                    {formatQuickBookingServiceType(type)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <Input
          label="Service visit title"
          name="title"
          placeholder="e.g. CNC Lathe Hydraulic Pressure Drop / AC Failure in Plant 2"
          required
        />
      </Section>

      <Section
        title="2. Site / Visit Location"
        helper="Provide the exact factory, plant, workshop, or commercial site address for technician arrival."
      >
        <Input
          label="Plant or site address / City"
          name="location"
          placeholder="e.g. Plot 42, MIDC Bhosari, Pune or Peenya Industrial Area, Bengaluru"
          required
        />
        <Textarea
          label="Site access instructions (optional)"
          name="siteAccessNotes"
          rows={2}
          placeholder="Gate entry pass requirement, bay/unit number, security check-in point, or visitor timing"
        />
      </Section>

      <Section
        title="3. Urgency & Preferred Timing"
        helper="Set dispatch priority so our operations desk routes this directly to available local teams."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Preferred date" name="preferredDate" type="date" />
          <Input label="Preferred time slot" name="preferredTime" placeholder="e.g. 10:00 AM - 1:00 PM" />
          <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
            Urgency level <span className="text-red-500">*</span>
            <select
              className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition-all duration-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              name="urgency"
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
            >
              {quickBookingUrgencies.map((urgency) => (
                <option key={urgency} value={urgency}>
                  {urgency.toUpperCase()} — {urgencyMeta[urgency]?.badge}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <Clock className="size-4 text-teal-600" />
          <span>
            <strong>Response SLA:</strong> {urgencyMeta[selectedUrgency]?.desc}
          </span>
        </div>

        <Input
          label="When did the issue start? (optional)"
          name="issueStartedAt"
          placeholder="e.g. 2 hours ago during morning shift, or yesterday after sudden power surge"
        />
      </Section>

      <Section
        title="4. Problem Details & Safety"
        helper="Technical specifications help technicians arrive equipped with appropriate test benches, gauges, and safety gear."
      >
        <Input
          label="Machine make / model / equipment name (optional)"
          name="machineOrEquipment"
          placeholder="e.g. 5TR Blue Star Package AC, Kirloskar 50HP Centrifugal Pump, LMW CNC Lathe"
        />
        <Textarea
          label="Problem symptoms / work description"
          name="description"
          rows={4}
          placeholder="Describe symptoms, abnormal sounds, error codes on PLC/VFD, leakages, or structural issues..."
        />
        <Textarea
          label="Site safety & PPE requirements (optional)"
          name="safetyRequirements"
          rows={2}
          placeholder="e.g. Safety shoes & helmet mandatory, hot work permit required, electrical lockout/tagout (LOTO)"
        />
      </Section>

      <Section
        title="5. Photos / Video Snaps"
        helper="Photos of machine nameplates, fault codes, or damage expedite technician assessment."
      >
        <div className="grid gap-2">
          <label className="grid cursor-pointer place-items-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 text-center transition hover:border-teal-500 hover:bg-teal-50/20">
            <FileImage className="size-8 text-slate-400" />
            <span className="mt-2 text-sm font-semibold text-slate-700">
              {fileCount > 0 ? `${fileCount} image(s) selected` : "Click to select or drag & drop images"}
            </span>
            <span className="mt-0.5 text-xs text-slate-500">Supports JPG, PNG, WebP</span>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => setFileCount(e.target.files?.length ?? 0)}
            />
          </label>
        </div>
      </Section>

      <Section
        title="6. Budget & On-Site Contact"
        helper="Add your site contact person for gate entry and coordination."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Indicative budget (₹ optional)"
            name="budget"
            min="0"
            type="number"
            placeholder="e.g. 5000"
          />
          <Input
            label="Site contact person (optional)"
            name="contactName"
            placeholder="e.g. Maintenance Head or Plant Supervisor"
          />
          <Input
            label="Site contact phone (optional)"
            name="contactPhone"
            type="tel"
            placeholder="e.g. +91 98765 43210"
          />
        </div>
      </Section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Registering Quick Booking...</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>Confirm & Book Service Visit</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
