import { getCurrentSessionFromCookie } from "@/lib/auth";

export async function getCurrentUser() {
  return getCurrentSessionFromCookie();
}
