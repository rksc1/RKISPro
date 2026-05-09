import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { VendorTypeSelector } from "@/components/ui/VendorTypeSelector";

export default function VendorRegisterPage() {
  return (
    <AuthShell title="Vendor onboarding" description="Submit your industrial supplier profile for admin approval.">
      <VendorTypeSelector />
      <p className="text-sm text-muted">Already registered? <Link className="font-semibold text-brand" href="/vendor/login">Login</Link></p>
    </AuthShell>
  );
}
