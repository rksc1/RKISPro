import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const policyLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/vendor-agreement", label: "Vendor Agreement" },
  { href: "/cookies", label: "Cookie Policy" }
];

export function AuthBackground({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.16),transparent_28%),linear-gradient(135deg,#020617_0%,#0f172a_55%,#111827_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <Logo variant="light" size="sm" />
          <Link className="rounded-lg px-3 py-2 text-sm font-semibold text-white/75 hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300" href="/">
            Back to home
          </Link>
        </header>
        <section className="grid flex-1 place-items-center py-10">{children}</section>
        <footer className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-white/50">
          <span>By continuing, you agree to RKISPro Terms and Policies.</span>
          {policyLinks.map((link) => (
            <Link className="hover:text-teal-300" href={link.href} key={link.href}>{link.label}</Link>
          ))}
        </footer>
      </div>
    </main>
  );
}
