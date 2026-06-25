import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/about#how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/vendor/register", label: "For Vendors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/services", label: "Services" },
  { href: "/vendor/register", label: "For Vendors" },
  { href: "/about", label: "About" },
  { href: "/about#how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export function StickyNavbar() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(6, 14, 20, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(0, 196, 204, 0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        {/* Logo + Nav */}
        <div className="flex min-w-0 items-center gap-10">
          <Logo className="" priority size="md" variant="light" />

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy-100 transition-all duration-150 hover:bg-white/[0.05] hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth?mode=login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-navy-100 transition-all duration-150 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            Sign In
          </Link>
          <Link
            href="/auth"
            className="btn-primary font-semibold"
          >
            Post Your Job
          </Link>
        </div>

        {/* Mobile CTAs */}
        <div className="flex items-center gap-2.5 md:hidden">
          <Link
            href="/auth"
            className="btn-primary text-xs px-4 py-2"
          >
            Post Your Job
          </Link>
          <details className="group relative">
            <summary
              className="grid size-9 cursor-pointer list-none place-items-center rounded-lg text-navy-100 transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              style={{ border: "1px solid rgba(0, 196, 204, 0.15)" }}
            >
              <span className="sr-only">Open navigation menu</span>
              <span className="grid gap-[5px]">
                <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:translate-y-[7px] group-open:rotate-45" />
                <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:opacity-0" />
                <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:-translate-y-[7px] group-open:-rotate-45" />
              </span>
            </summary>
            <div
              className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl p-2"
              style={{
                background: "rgba(10, 24, 37, 0.95)",
                border: "1px solid rgba(0, 196, 204, 0.12)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                backdropFilter: "blur(16px)",
              }}
            >
              <nav aria-label="Mobile navigation" className="grid gap-0.5">
                <Link
                  href="/auth?mode=login"
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy-100 transition hover:bg-white/[0.05] hover:text-teal-400"
                >
                  Sign In
                </Link>
                <div className="divider-glow my-1" />
                {mobileLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy-100 transition hover:bg-white/[0.05] hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

