import type { ReactNode } from "react";
import { Sidebar, type SidebarLink } from "@/components/ui/Sidebar";
import { NotificationBell } from "@/components/ui/NotificationBell";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { Role } from "@/types/auth";

export async function PortalShell({
  title,
  sidebarTitle,
  role,
  userId,
  links,
  children
}: {
  title: string;
  sidebarTitle: string;
  role: Role;
  userId: string;
  links: SidebarLink[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar title={sidebarTitle} links={links} />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <BrandLogo size="sm" />
              <h1 className="mt-2 text-3xl font-bold">{title}</h1>
            </div>
            <NotificationBell role={role} userId={userId} />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
