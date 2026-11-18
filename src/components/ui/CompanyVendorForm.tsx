import { AuthField } from "@/components/ui/AuthField";
import { AuthTextarea } from "@/components/ui/AuthTextarea";

export function CompanyVendorForm() {
  return (
    <div className="grid gap-4">
      <AuthField label="Workshop / Company Name" name="companyName" placeholder="e.g. Sharma Metal Fabricators / Marks Engineering" required />
      <AuthField label="Owner Name" name="ownerName" placeholder="e.g. Rajesh Sharma" required />
      <AuthField label="GST Number (optional for small workshops)" name="gstNumber" placeholder="Leave empty if not registered yet" />
      <AuthField label="Workshop Address / Area" name="workshopAddress" placeholder="e.g. Plot 12, Industrial Area, Bilaspur" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField label="City" name="city" placeholder="e.g. Bilaspur / Raipur / Pune" required />
        <AuthField label="State" name="state" placeholder="e.g. Chhattisgarh / Maharashtra" required />
      </div>
      <AuthTextarea
        label="Services You Provide"
        name="services"
        rows={2}
        placeholder="e.g. Gates, SS railings, roof sheds, window grills, warehouse trolleys, lathe turning, structural welding"
        required
      />
      <AuthTextarea
        label="Machines & Tools Available in Workshop"
        name="machinery"
        rows={2}
        placeholder="e.g. MIG/ARC welding, metal cutting chop saw, lathe machine, drill press, sheet bending, gas cutter"
        required
      />
      <AuthField
        label="Approx Monthly Capacity"
        name="capacity"
        placeholder="e.g. 5–10 tons/month, or 15–20 small metal jobs/month"
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField label="Worker Count" name="workerCount" type="number" min={1} placeholder="e.g. 4" required />
        <AuthField label="Years of Experience" name="experienceYears" type="number" min={0} placeholder="e.g. 8" required />
      </div>
      <AuthField label="Workshop / Shop Logo (optional)" name="logo" type="file" accept="image/*" />
      <AuthField label="Photos of Workshop or Past Work" name="workshopImages" type="file" accept="image/*,.pdf" multiple />
      <div className="grid gap-2 pt-1 text-xs text-slate-300">
        <label className="flex items-center gap-2 font-medium">
          <input name="availableForLargeWork" type="checkbox" value="true" defaultChecked className="rounded border-slate-700 text-teal-500 focus:ring-teal-400" />
          Available for regular fabrication &amp; commercial orders
        </label>
        <label className="flex items-center gap-2 font-medium">
          <input name="availableForQuickBooking" type="checkbox" value="true" defaultChecked className="rounded border-slate-700 text-teal-500 focus:ring-teal-400" />
          Available for on-site measurement &amp; repair visits
        </label>
      </div>
    </div>
  );
}
