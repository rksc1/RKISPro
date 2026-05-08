import { NextResponse, type NextRequest } from "next/server";
import { dashboardByRole, loginByRole } from "@/lib/routes";
import { getRouteSession, isProtectedRoute } from "@/middleware/route-protection";

const authPages = [
  "/customer/login",
  "/customer/register",
  "/vendor/login",
  "/vendor/register",
  "/admin/login"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { role, session } = await getRouteSession(request);

  if (isProtectedRoute(pathname) && (!role || !session || session.role !== role)) {
    return NextResponse.redirect(new URL(loginByRole[role ?? "customer"], request.url));
  }

  if (session && authPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(dashboardByRole[session.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/vendor/:path*", "/admin/:path*"]
};
