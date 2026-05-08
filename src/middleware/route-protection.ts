import type { NextRequest } from "next/server";
import { cookieByRole, verifySession } from "@/lib/session";
import { roleFromPath } from "@/lib/routes";

const protectedPrefixes = [
  "/customer/dashboard",
  "/customer/projects",
  "/customer/requests",
  "/customer/request",
  "/vendor/dashboard",
  "/vendor/rfqs",
  "/vendor/projects",
  "/admin/dashboard",
  "/admin/vendors",
  "/admin/requests",
  "/admin/quotes",
  "/admin/projects"
];

export async function getRouteSession(request: NextRequest) {
  const role = roleFromPath(request.nextUrl.pathname);
  if (!role) return { role: null, session: null };

  const token = request.cookies.get(cookieByRole[role])?.value;
  const session = await verifySession(token);

  return { role, session };
}

export function isProtectedRoute(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
}
