import type { ReactNode } from "react";
import { PortalShell } from "@/components/layout/PortalShell";
import { getVendorFromCookie } from "@/lib/auth";

export async function VendorLayout({ title, children }: { title: string; children: ReactNode }) {
  const vendor = await getVendorFromCookie();

  return (
    <PortalShell
      title={title}
      sidebarTitle="Vendor Portal"
      role="vendor"
      userId={vendor?.id ?? ""}
      links={[
        { href: "/vendor/dashboard", label: "Dashboard" },
        { href: "/vendor/dashboard#profile", label: "Profile" },
        { href: "/vendor/rfqs", label: "RFQs" },
        { href: "/vendor/projects", label: "Projects" },
        { href: "/vendor/notifications", label: "Notifications" }
      ]}
    >
      {children}
    </PortalShell>
  );
}
