import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function VendorRegisterPage() {
  return (
    <AuthShell title="Vendor onboarding" description="Submit your industrial supplier profile for admin approval.">
      <form className="form-grid" action="/api/vendor/register" method="post" encType="multipart/form-data">
        <Input label="Company name" name="companyName" required />
        <Input label="Owner name" name="ownerName" required />
        <Input label="Phone" name="phone" required />
        <Input label="Email" name="email" type="email" required />
        <Input label="GST number" name="gstNumber" required />
        <Input label="Location" name="location" required />
        <Textarea label="Services" name="services" rows={3} required />
        <Textarea label="Machinery" name="machinery" rows={3} required />
        <Input label="Capacity" name="capacity" required />
        <Input label="Worker count" name="workerCount" type="number" min={0} required />
        <Input label="Experience years" name="experienceYears" type="number" min={0} required />
        <Input label="Logo" name="logo" type="file" accept="image/*" />
        <Input label="Factory images" name="factoryImages" type="file" accept="image/*,.pdf,.doc,.docx" multiple />
        <Input label="Password" name="password" type="password" minLength={8} required />
        <Button type="submit">Submit Vendor Profile</Button>
      </form>
      <p className="text-sm text-muted">Already registered? <Link className="font-semibold text-brand" href="/vendor/login">Login</Link></p>
    </AuthShell>
  );
}
