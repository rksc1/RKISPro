import type { ReactNode } from "react";
import { Sidebar, type SidebarLink } from "@/components/ui/Sidebar";
import { NotificationBell } from "@/components/ui/NotificationBell";
import type { Role } from "@/types/auth";

export async function PortalShell({
  title,
  sidebarTitle,
  role,
  userId,
  links,
  children,
}: {
  title: string;
  sidebarTitle: string;
  role: Role;
  userId: string;
  links: SidebarLink[];
  children: ReactNode;
}) {
  return (
    <div
      className="min-h-screen lg:flex"
      style={{ background: "#060E14" }}
    >
      <Sidebar title={sidebarTitle} links={links} />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6">
          {/* Page header */}
          <div
            className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
            style={{
              background: "rgba(14, 30, 39, 0.6)",
              border: "1px solid rgba(0, 196, 204, 0.08)",
            }}
          >
            <div>
              <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
              <p className="mt-0.5 text-xs text-navy-100/60 uppercase tracking-widest">
                RKISPro Dashboard
              </p>
            </div>
            <NotificationBell role={role} userId={userId} />
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
