import type { ReactNode } from "react";
import { PortalShell } from "@/components/layout/PortalShell";
import { getCustomerFromCookie } from "@/lib/auth";

export async function CustomerLayout({ title, children }: { title: string; children: ReactNode }) {
  const customer = await getCustomerFromCookie();

  return (
    <PortalShell
      title={title}
      sidebarTitle="Customer Portal"
      role="customer"
      userId={customer?.id ?? ""}
      links={[
        { href: "/customer/dashboard", label: "Dashboard" },
        { href: "/customer/quick-booking/new", label: "Quick Booking" },
        { href: "/customer/quick-bookings", label: "My Quick Bookings" },
        { href: "/customer/request/new", label: "New Request" },
        { href: "/customer/dashboard#requests", label: "Requests" },
        { href: "/customer/projects", label: "Projects" },
        { href: "/customer/notifications", label: "Notifications" }
      ]}
    >
      {children}
    </PortalShell>
  );
}
