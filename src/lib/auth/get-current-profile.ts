import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getProfileByEmail } from "@/services/auth-service";

export async function getCurrentProfile() {
  const session = await getCurrentUser();
  if (!session) return null;
  return getProfileByEmail(session.email);
}
