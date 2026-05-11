import { NextResponse, type NextRequest } from "next/server";
import { dashboardByRole, loginByRole } from "@/lib/routes";
import { getAnyRouteSession, getRouteSession, isProtectedRoute } from "@/middleware/route-protection";

const authPages = [
  "/auth",
  "/customer/login",
  "/customer/register",
  "/vendor/login",
  "/vendor/register",
  "/admin/login"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { role, session } = await getRouteSession(request);
  const activeSession = session ?? (pathname.startsWith("/auth") ? await getAnyRouteSession(request) : null);

  if (isProtectedRoute(pathname) && (!role || !session || session.role !== role)) {
    return NextResponse.redirect(new URL(loginByRole[role ?? "customer"], request.url));
  }

  if (activeSession && authPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(dashboardByRole[activeSession.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/customer/:path*", "/vendor/:path*", "/admin/:path*"]
};
