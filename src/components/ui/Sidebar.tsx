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
    <aside className="border-r border-edge bg-surface lg:min-h-screen lg:w-64">
      {/* Desktop permanent sidebar */}
      <div className="hidden lg:flex lg:h-full lg:flex-col">
        <div className="border-b border-edge px-5 py-5">
          <div className="grid gap-1.5">
            <Logo size="sm" variant="dark" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark">
              {title}
            </span>
          </div>
        </div>

        <nav className="grid gap-1 px-3 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-150 hover:bg-slate-100 hover:text-brand-dark"
            >
              {link.icon && <span className="size-4 text-slate-400">{link.icon}</span>}
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
      </div>

      {/* Mobile collapsible header */}
      <details className="group lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 border-b border-edge px-5 py-4">
          <span className="grid gap-1">
            <Logo size="sm" variant="dark" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark">
              {title}
            </span>
          </span>
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
            Menu ▾
          </span>
        </summary>

        <nav className="grid gap-1 border-b border-edge bg-slate-50/70 px-4 py-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-white hover:text-brand-dark"
            >
              {link.icon && <span className="size-4 text-slate-400">{link.icon}</span>}
              {link.label}
            </Link>
          ))}

          <div className="my-1 border-t border-edge" />

          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
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
