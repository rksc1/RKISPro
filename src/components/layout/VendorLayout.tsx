import type { ReactNode } from "react";
import { PortalShell } from "@/components/layout/PortalShell";
import { getVendorFromCookie } from "@/lib/auth";
import { getVendorById } from "@/services/vendor-service";

export async function VendorLayout({ title, children }: { title: string; children: ReactNode }) {
  const vendor = await getVendorFromCookie();
  const profile = vendor ? await getVendorById(vendor.id) : null;
  const links = [
    { href: "/vendor/dashboard", label: "Dashboard" },
    { href: "/vendor/dashboard#profile", label: "Profile" },
    ...(profile?.availableForQuickBooking ? [{ href: "/vendor/quick-bookings", label: "Quick Bookings" }] : []),
    ...(profile?.vendorType === "company" || profile?.availableForLargeWork ? [
      { href: "/vendor/rfqs", label: "RFQs" },
      { href: "/vendor/projects", label: "Projects" }
    ] : []),
    { href: "/vendor/projects", label: "Payments" },
    { href: "/vendor/notifications", label: "Reviews" },
    { href: "/vendor/notifications", label: "Notifications" }
  ];

  return (
    <PortalShell
      title={title}
      sidebarTitle="Vendor Portal"
      role="vendor"
      userId={vendor?.id ?? ""}
      links={links}
    >
      {children}
    </PortalShell>
  );
}
