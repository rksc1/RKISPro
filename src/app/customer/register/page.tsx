import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CustomerRegisterPage() {
  return (
    <AuthShell title="Customer registration" description="Create a customer profile for future requirement submissions.">
      <form className="form-grid" action="/api/customer/register" method="post">
        <Input label="Name" name="name" required />
        <Input label="Phone" name="phone" required />
        <Input label="Email" name="email" type="email" required />
        <Input label="Company name" name="companyName" required />
        <Input label="Location" name="location" required />
        <Input label="Password" name="password" type="password" minLength={8} required />
        <Button type="submit">Create Account</Button>
      </form>
      <p className="text-sm text-muted">Already registered? <Link className="font-semibold text-brand" href="/customer/login">Login</Link></p>
    </AuthShell>
  );
}
