import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function IndividualVendorForm() {
  return (
    <div className="grid gap-4">
      <Input label="Full name" name="fullName" />
      <Textarea label="Skill categories" name="skillCategories" rows={3} placeholder="welder, repair, electrician" />
      <Input label="City" name="city" />
      <Input label="State" name="state" />
      <Input label="Service radius (km)" name="serviceRadiusKm" type="number" min={0} />
      <Input label="Experience years" name="experienceYears" type="number" min={0} />
      <Input label="Profile photo" name="profilePhoto" type="file" accept="image/*" />
      <Input label="ID proof" name="idProof" type="file" accept="image/*,.pdf" />
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input name="availableForQuickBooking" type="checkbox" value="true" defaultChecked />
        Available for quick booking
      </label>
    </div>
  );
}
