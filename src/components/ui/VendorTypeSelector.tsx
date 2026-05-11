"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, CheckCircle2, Factory, Loader2, UserRoundCog } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthField } from "@/components/ui/AuthField";
import { CompanyVendorForm } from "@/components/ui/CompanyVendorForm";
import { IndividualVendorForm } from "@/components/ui/IndividualVendorForm";
import type { VendorType } from "@/types/auth";

export function VendorTypeSelector() {
  const [type, setType] = useState<VendorType>("individual");
  const [submitting, setSubmitting] = useState(false);

  return (
    <form className="grid gap-5" action="/api/vendor/register" method="post" encType="multipart/form-data" onSubmit={() => setSubmitting(true)}>
      <div className="grid gap-3">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">Register as</p>
        <div className="grid gap-3 md:grid-cols-2">
          <VendorTypeButton
            active={type === "individual"}
            description="For welders, mechanics, repair workers, installers, electricians, technicians."
            icon={<UserRoundCog className="size-5" />}
            label="Individual Professional"
            onClick={() => setType("individual")}
          />
          <VendorTypeButton
            active={type === "company"}
            description="For fabrication workshops, machine shops, manufacturers, contractors."
            icon={<Factory className="size-5" />}
            label="Company / Workshop"
            onClick={() => setType("company")}
          />
        </div>
      </div>

      <input name="vendorType" type="hidden" value={type} />

      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-slate-950/45 p-4"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: 8 }}
          key={type}
          transition={{ duration: 0.22 }}
        >
          {type === "individual" ? <IndividualVendorForm /> : <CompanyVendorForm />}
        </motion.div>
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField label="Phone number" name="phone" required />
        <AuthField label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField label="PAN number (optional)" name="panNumber" />
        <AuthField label="Password" name="password" type="password" minLength={8} required />
      </div>

      <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">
        <input className="mt-1 size-4 accent-teal-500" name="agreementAccepted" type="checkbox" required />
        <span>
          I agree to Vendor Agreement, Terms of Service, Privacy Policy, and Marketplace Policies.
        </span>
      </label>

      <Button className="rounded-2xl bg-teal-500 hover:bg-teal-400" disabled={submitting} type="submit">
        {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
        Submit Vendor Profile
      </Button>

      <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
        <CheckCircle2 className="size-4 text-teal-300" />
        Vendor account status will remain pending until RKISPro admin approval.
      </div>
    </form>
  );
}

function VendorTypeButton({
  active,
  label,
  description,
  icon,
  onClick
}: {
  active: boolean;
  label: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`rounded-3xl border p-4 text-left transition ${active ? "border-teal-300/50 bg-teal-400/10 text-white shadow-lg shadow-teal-950/20" : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/20 hover:bg-white/[0.07]"}`}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start gap-3">
        <div className="grid size-10 place-items-center rounded-2xl bg-teal-400/10 text-teal-300">
          {active ? <Building2 className="size-5" /> : icon}
        </div>
        <div>
          <strong>{label}</strong>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
      </div>
    </button>
  );
}
