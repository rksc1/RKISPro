import { AuthBackground } from "@/components/ui/AuthBackground";
import { RoleSelection } from "@/components/ui/RoleSelection";
import { UnifiedLoginForm } from "@/components/ui/UnifiedLoginForm";

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string; message?: string; email?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "login" ? "login" : "register";

  return (
    <AuthBackground>
      {mode === "login" ? (
        <UnifiedLoginForm initialEmail={params.email} initialMessage={params.message} />
      ) : (
        <RoleSelection mode="register" />
      )}
    </AuthBackground>
  );
}
