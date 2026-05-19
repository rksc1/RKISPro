import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirectPathByRole, unifiedLoginPath } from "@/lib/auth/redirect-by-role";
import type { Role } from "@/types/auth";

export async function requireRole(role: Role) {
  const session = await getCurrentUser();
  if (!session) redirect(unifiedLoginPath);
  if (session.role !== role) redirect(redirectPathByRole(session.role));
  return session;
}
