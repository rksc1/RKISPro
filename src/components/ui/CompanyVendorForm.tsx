import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function CompanyVendorForm() {
  return (
    <div className="grid gap-4">
      <Input label="Company / workshop name" name="companyName" />
      <Input label="Owner name" name="ownerName" />
      <Input label="GST number" name="gstNumber" />
      <Input label="Workshop address" name="workshopAddress" />
      <Input label="City" name="city" />
      <Input label="State" name="state" />
      <Textarea label="Services" name="services" rows={3} placeholder="fabrication, welding, CNC machining" />
      <Textarea label="Machinery" name="machinery" rows={3} placeholder="lathe, CNC, welding machine" />
      <Input label="Capacity" name="capacity" />
      <Input label="Worker count" name="workerCount" type="number" min={0} />
      <Input label="Experience years" name="experienceYears" type="number" min={0} />
      <Input label="Logo" name="logo" type="file" accept="image/*" />
      <Input label="Workshop images" name="workshopImages" type="file" accept="image/*,.pdf,.doc,.docx" multiple />
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input name="availableForLargeWork" type="checkbox" value="true" defaultChecked />
        Available for large RFQ work
      </label>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input name="availableForQuickBooking" type="checkbox" value="true" />
        Also available for quick booking
      </label>
    </div>
  );
}
