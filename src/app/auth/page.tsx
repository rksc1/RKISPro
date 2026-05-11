import { AuthBackground } from "@/components/ui/AuthBackground";
import { RoleSelection } from "@/components/ui/RoleSelection";

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "login" ? "login" : "register";

  return (
    <AuthBackground>
      <RoleSelection mode={mode} />
    </AuthBackground>
  );
}
