import type { ReactNode } from "react";
import { PortalShell } from "@/components/layout/PortalShell";
import { getAdminFromCookie } from "@/lib/auth";

export async function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const admin = await getAdminFromCookie();

  return (
    <PortalShell
      title={title}
      sidebarTitle="Admin"
      role="admin"
      userId={admin?.id ?? ""}
      links={[
        { href: "/admin/dashboard", label: "Dashboard" },
        { href: "/admin/vendors", label: "Vendors" },
        { href: "/admin/requests", label: "Requests" },
        { href: "/admin/quotes", label: "Quotes" },
        { href: "/admin/projects", label: "Projects" },
        { href: "/admin/notifications", label: "Notifications" },
        { href: "/admin/activity", label: "Activity" }
      ]}
    >
      {children}
    </PortalShell>
  );
}
