import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";

const policyLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/vendor-agreement", label: "Vendor Agreement" },
  { href: "/cookies", label: "Cookie Policy" },
];

export function AuthBackground({ children }: { children: ReactNode }) {
  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background: "linear-gradient(160deg, #060E14 0%, #0A1825 55%, #0E1E27 100%)",
      }}
    >
      {/* Ambient teal glow top */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -10%, rgba(0,196,204,0.10) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 90% 80%, rgba(245,158,11,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,196,204,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,204,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <Logo variant="light" size="sm" />
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-100 transition hover:bg-white/[0.05] hover:text-teal-400"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </header>

        {/* Content */}
        <section className="grid flex-1 place-items-center py-10">
          {children}
        </section>

        {/* Footer */}
        <footer
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-5 text-xs text-navy-100/40"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span>By continuing, you agree to RKISPro Terms and Policies.</span>
          {policyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-teal-400"
            >
              {link.label}
            </Link>
          ))}
        </footer>
      </div>
    </main>
  );
}
