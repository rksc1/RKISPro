import { AuthField } from "@/components/ui/AuthField";
import { AuthTextarea } from "@/components/ui/AuthTextarea";

export function IndividualVendorForm() {
  return (
    <div className="grid gap-4">
      <AuthField label="Full name" name="fullName" />
      <AuthTextarea label="Skill categories" name="skillCategories" rows={3} placeholder="welder, repair, electrician" />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField label="City" name="city" />
        <AuthField label="State" name="state" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField label="Service radius (km)" name="serviceRadiusKm" type="number" min={0} />
        <AuthField label="Experience years" name="experienceYears" type="number" min={0} />
      </div>
      <AuthField label="Profile photo" name="profilePhoto" type="file" accept="image/*" />
      <AuthField label="ID proof" name="idProof" type="file" accept="image/*,.pdf" />
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
        <input name="availableForQuickBooking" type="checkbox" value="true" defaultChecked />
        Available for quick booking
      </label>
    </div>
  );
}
