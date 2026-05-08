import Link from "next/link";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CustomerLoginPage() {
  return (
    <AuthShell title="Customer login" description="Access your customer dashboard.">
      <form className="form-grid" action="/api/customer/login" method="post">
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required />
        <Button type="submit">Login</Button>
      </form>
      <p className="text-sm text-muted">Need an account? <Link className="font-semibold text-brand" href="/customer/register">Register</Link></p>
    </AuthShell>
  );
}
