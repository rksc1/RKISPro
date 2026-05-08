import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminLoginPage() {
  return (
    <AuthShell title="Admin login" description="Access marketplace operations.">
      <form className="form-grid" action="/api/auth/admin/login" method="post">
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required />
        <Button type="submit">Login</Button>
      </form>
    </AuthShell>
  );
}
