import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LogOut } from "lucide-react";

export type SidebarLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export function Sidebar({
  title,
  links,
}: {
  title: string;
  links: SidebarLink[];
}) {
  return (
    <aside
      className="lg:min-h-screen lg:w-64"
      style={{
        background: "rgba(6, 14, 20, 0.98)",
        borderRight: "1px solid rgba(0, 196, 204, 0.08)",
      }}
    >
      <details className="group" open>
        {/* Header */}
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-5 lg:cursor-default"
          style={{ borderBottom: "1px solid rgba(0, 196, 204, 0.06)" }}
        >
          <span className="grid gap-1.5">
            <Logo size="sm" variant="light" />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "#00C4CC" }}
            >
              {title}
            </span>
          </span>
          <span className="text-sm font-medium text-navy-100 lg:hidden">Menu ▾</span>
        </summary>

        {/* Nav links */}
        <nav className="grid gap-1 px-3 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-100 transition-all duration-150 hover:bg-white/[0.05] hover:text-teal-400"
            >
              {link.icon && (
                <span className="size-4 text-navy-200">{link.icon}</span>
              )}
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="divider-glow my-2" />

          {/* Logout */}
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-100 transition-all duration-150 hover:bg-red-950/30 hover:text-red-400"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </form>
        </nav>
      </details>
    </aside>
  );
}
