import type { NextRequest } from "next/server";
import { cookieByRole, verifySession } from "@/lib/session";
import { roleFromPath } from "@/lib/routes";

const protectedPrefixes = [
  "/customer/dashboard",
  "/customer/notifications",
  "/customer/projects",
  "/customer/quick-booking",
  "/customer/quick-bookings",
  "/customer/requests",
  "/customer/request",
  "/vendor/dashboard",
  "/vendor/notifications",
  "/vendor/quick-bookings",
  "/vendor/rfqs",
  "/vendor/projects",
  "/admin/activity",
  "/admin/dashboard",
  "/admin/finance",
  "/admin/notifications",
  "/admin/quick-bookings",
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

  return { role, session: session?.emailConfirmedAt ? session : null };
}

export async function getAnyRouteSession(request: NextRequest) {
  for (const role of ["customer", "vendor", "admin"] as const) {
    const token = request.cookies.get(cookieByRole[role])?.value;
    const session = await verifySession(token);
    if (session?.role === role && session.emailConfirmedAt) return session;
  }

  return null;
}

export async function getAnyUnconfirmedRouteSession(request: NextRequest) {
  for (const role of ["customer", "vendor", "admin"] as const) {
    const token = request.cookies.get(cookieByRole[role])?.value;
    const session = await verifySession(token);
    if (session?.role === role && !session.emailConfirmedAt) return session;
  }

  return null;
}

export function isProtectedRoute(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
}
