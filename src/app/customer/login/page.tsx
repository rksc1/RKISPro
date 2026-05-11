import { AuthBackground } from "@/components/ui/AuthBackground";
import { AuthField } from "@/components/ui/AuthField";
import { AuthFormCard } from "@/components/ui/AuthFormCard";

export default function CustomerLoginPage() {
  return (
    <AuthBackground>
      <AuthFormCard
        action="/api/customer/login"
        roleHref="/auth?mode=login"
        submitLabel="Login as Customer"
        subtitle="Access RFQs, projects, quotes, invoices, and payment tracking."
        switchHref="/customer/register"
        switchLabel="Create account"
        switchText="New customer?"
        title="Customer login"
      >
        <AuthField autoComplete="email" label="Email" name="email" type="email" required />
        <AuthField autoComplete="current-password" label="Password" name="password" type="password" required />
      </AuthFormCard>
    </AuthBackground>
  );
}
