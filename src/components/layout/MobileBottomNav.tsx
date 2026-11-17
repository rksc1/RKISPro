"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  CreditCard,
  FileText,
  Home,
  PlusCircle,
  Wrench
} from "lucide-react";
import type { Role } from "@/types/auth";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
};

const customerNav: NavItem[] = [
  { href: "/customer/dashboard", label: "Home", icon: Home },
  { href: "/customer/requests", label: "RFQs", icon: FileText },
  { href: "/customer/request/new", label: "Post Job", icon: PlusCircle, highlight: true },
  { href: "/customer/quick-bookings", label: "Visits", icon: Wrench },
  { href: "/customer/projects", label: "Projects", icon: Briefcase }
];

const vendorNav: NavItem[] = [
  { href: "/vendor/dashboard", label: "Home", icon: Home },
  { href: "/vendor/rfqs", label: "Bids & RFQs", icon: FileText },
  { href: "/vendor/quick-bookings", label: "Site Visits", icon: Wrench },
  { href: "/vendor/projects", label: "Projects", icon: Briefcase },
  { href: "/vendor/finance", label: "Earnings", icon: CreditCard }
];

export function MobileBottomNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = role === "vendor" ? vendorNav : role === "customer" ? customerNav : null;

  if (!items) return null;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-white/95 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/customer/dashboard" && item.href !== "/vendor/dashboard" && pathname.startsWith(item.href));

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative -mt-4 flex flex-col items-center"
              >
                <div className="flex size-11 items-center justify-center rounded-full bg-teal-600 text-white shadow-md shadow-teal-600/30 transition-transform active:scale-95 group-hover:bg-teal-700">
                  <Icon className="size-5" />
                </div>
                <span className="mt-1 text-[10px] font-bold text-teal-800 tracking-tight">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center px-2 py-1 transition-colors ${
                isActive ? "text-teal-600 font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className={`size-5 ${isActive ? "text-teal-600 stroke-[2.25]" : "text-slate-400 stroke-[1.75]"}`} />
              <span className="mt-0.5 text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
