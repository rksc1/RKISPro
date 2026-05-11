import { AuthBackground } from "@/components/ui/AuthBackground";
import { AuthField } from "@/components/ui/AuthField";
import { AuthFormCard } from "@/components/ui/AuthFormCard";

export default function VendorLoginPage() {
  return (
    <AuthBackground>
      <AuthFormCard
        action="/api/auth/vendor/login"
        roleHref="/auth?mode=login"
        submitLabel="Login as Vendor"
        subtitle="Access assigned RFQs, quotations, milestones, quick bookings, and payouts."
        switchHref="/vendor/register"
        switchLabel="Join as vendor"
        switchText="Need an account?"
        title="Vendor login"
      >
        <AuthField autoComplete="email" label="Email" name="email" type="email" required />
        <AuthField autoComplete="current-password" label="Password" name="password" type="password" required />
      </AuthFormCard>
    </AuthBackground>
  );
}
