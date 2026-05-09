"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CompanyVendorForm } from "@/components/ui/CompanyVendorForm";
import { IndividualVendorForm } from "@/components/ui/IndividualVendorForm";
import type { VendorType } from "@/types/auth";

export function VendorTypeSelector() {
  const [type, setType] = useState<VendorType>("individual");

  return (
    <form className="form-grid" action="/api/vendor/register" method="post" encType="multipart/form-data">
      <div className="grid gap-3">
        <p className="text-sm font-bold text-brand-dark">Register as</p>
        <div className="grid gap-3 md:grid-cols-2">
          <button
            className={`rounded-lg border p-4 text-left ${type === "individual" ? "border-brand bg-amber-50" : "border-line bg-white"}`}
            onClick={() => setType("individual")}
            type="button"
          >
            <strong>Individual Professional</strong>
            <p className="mt-2 text-sm text-muted">For welders, mechanics, repair workers, installers, electricians, technicians.</p>
          </button>
          <button
            className={`rounded-lg border p-4 text-left ${type === "company" ? "border-brand bg-amber-50" : "border-line bg-white"}`}
            onClick={() => setType("company")}
            type="button"
          >
            <strong>Company / Workshop</strong>
            <p className="mt-2 text-sm text-muted">For fabrication workshops, machine shops, manufacturers, contractors.</p>
          </button>
        </div>
      </div>
      <input name="vendorType" type="hidden" value={type} />
      <div className="rounded-lg border border-line bg-white p-4">
        {type === "individual" ? <IndividualVendorForm /> : <CompanyVendorForm />}
      </div>
      <Input label="Phone" name="phone" required />
      <Input label="Email" name="email" type="email" required />
      <Input label="Password" name="password" type="password" minLength={8} required />
      <Button type="submit">Submit Vendor Profile</Button>
    </form>
  );
}
