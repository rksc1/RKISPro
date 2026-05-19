import type { Role } from "@/types/auth";

export const roleDashboardPath: Record<Role, string> = {
  admin: "/admin/dashboard",
  customer: "/customer/dashboard",
  vendor: "/vendor/dashboard"
};

export const unifiedLoginPath = "/auth?mode=login";

export function redirectPathByRole(role: Role) {
  return roleDashboardPath[role];
}
