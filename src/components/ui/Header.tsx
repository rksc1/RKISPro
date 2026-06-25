import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Header() {
  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "rgba(6, 14, 20, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(0, 196, 204, 0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="page-shell flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
        <BrandLogo compactOnMobile size="sm" variant="light" />
        <nav className="flex flex-wrap items-center gap-1 text-sm font-medium">
          {[
            { href: "/about", label: "About" },
            { href: "/services", label: "Services" },
            { href: "/contact", label: "Contact" },
            { href: "/auth?mode=login", label: "Sign In" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-navy-100 transition-all hover:bg-white/[0.05] hover:text-teal-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/auth" className="btn-primary text-xs px-4 py-2">
          Post Your Job
        </Link>
      </div>
    </header>
  );
}
