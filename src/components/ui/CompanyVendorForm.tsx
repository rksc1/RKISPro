import { AuthField } from "@/components/ui/AuthField";
import { AuthTextarea } from "@/components/ui/AuthTextarea";

export function CompanyVendorForm() {
  return (
    <div className="grid gap-4">
      <AuthField label="Company / workshop name" name="companyName" required />
      <AuthField label="Owner name" name="ownerName" required />
      <AuthField label="GST number (optional initially)" name="gstNumber" />
      <AuthField label="Workshop address" name="workshopAddress" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField label="City" name="city" required />
        <AuthField label="State" name="state" required />
      </div>
      <AuthTextarea label="Services" name="services" rows={3} placeholder="fabrication, welding, CNC machining" required />
      <AuthTextarea label="Machinery" name="machinery" rows={3} placeholder="lathe, CNC, welding machine" required />
      <AuthField label="Capacity" name="capacity" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField label="Worker count" name="workerCount" type="number" min={0} required />
        <AuthField label="Experience years" name="experienceYears" type="number" min={0} required />
      </div>
      <AuthField label="Logo" name="logo" type="file" accept="image/*" />
      <AuthField label="Workshop images" name="workshopImages" type="file" accept="image/*,.pdf,.doc,.docx" multiple />
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
        <input name="availableForLargeWork" type="checkbox" value="true" defaultChecked />
        Available for large RFQ work
      </label>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
        <input name="availableForQuickBooking" type="checkbox" value="true" />
        Also available for quick booking
      </label>
    </div>
  );
}
