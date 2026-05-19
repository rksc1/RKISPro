import { AuthBackground } from "@/components/ui/AuthBackground";
import { EmailConfirmationNotice } from "@/components/ui/EmailConfirmationNotice";

export default async function CheckEmailPage({
  searchParams
}: {
  searchParams: Promise<{ email?: string; role?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthBackground>
      <EmailConfirmationNotice email={params.email} role={params.role} />
    </AuthBackground>
  );
}
