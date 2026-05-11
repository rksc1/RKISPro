import { AuthBackground } from "@/components/ui/AuthBackground";
import { AuthField } from "@/components/ui/AuthField";
import { AuthFormCard } from "@/components/ui/AuthFormCard";

export default function CustomerRegisterPage() {
  return (
    <AuthBackground>
      <AuthFormCard
        action="/api/customer/register"
        roleHref="/auth"
        submitLabel="Create Customer Account"
        subtitle="Post RFQs, compare verified quotations, and manage industrial projects."
        switchHref="/customer/login"
        switchLabel="Login"
        switchText="Already registered?"
        title="Customer registration"
      >
        <AuthField autoComplete="name" label="Full name" name="name" required />
        <AuthField label="Company name (optional)" name="companyName" />
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField autoComplete="tel" label="Phone number" name="phone" required />
          <AuthField label="City" name="city" required />
        </div>
        <AuthField label="State" name="state" required />
        <AuthField autoComplete="email" label="Email" name="email" type="email" required />
        <AuthField autoComplete="new-password" label="Password" name="password" type="password" minLength={8} required />
      </AuthFormCard>
    </AuthBackground>
  );
}
