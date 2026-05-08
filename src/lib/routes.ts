import type { Role } from "@/types/auth";

export const dashboardByRole: Record<Role, string> = {
  customer: "/customer/dashboard",
  vendor: "/vendor/dashboard",
  admin: "/admin/dashboard"
};

export const loginByRole: Record<Role, string> = {
  customer: "/customer/login",
  vendor: "/vendor/login",
  admin: "/admin/login"
};

export function roleFromPath(pathname: string): Role | null {
  if (pathname.startsWith("/customer")) return "customer";
  if (pathname.startsWith("/vendor")) return "vendor";
  if (pathname.startsWith("/admin")) return "admin";
  return null;
}
