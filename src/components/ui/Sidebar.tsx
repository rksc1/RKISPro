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
      className="lg:min-h-screen lg:w-64 bg-surface border-r border-edge"
    >
      <details className="group" open>
        {/* Header */}
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-5 lg:cursor-default border-b border-edge"
        >
          <span className="grid gap-1.5">
            <Logo size="sm" variant="dark" />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark"
            >
              {title}
            </span>
          </span>
          <span className="text-sm font-medium text-slate-600 lg:hidden">Menu ▾</span>
        </summary>

        {/* Nav links */}
        <nav className="grid gap-1 px-3 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-150 hover:bg-slate-100 hover:text-brand-dark"
            >
              {link.icon && (
                <span className="size-4 text-slate-400">{link.icon}</span>
              )}
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="my-2 border-t border-edge" />

          {/* Logout */}
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-150 hover:bg-red-50 hover:text-red-600"
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
