import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/about#how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/vendor/register", label: "Vendors" },
  { href: "/about", label: "About" }
];

const mobileLinks = [
  { href: "/services", label: "Services" },
  { href: "/vendor/register", label: "Vendors" },
  { href: "/about", label: "About" },
  { href: "/about#how-it-works", label: "How It Works" }
];

export function StickyNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 shadow-[0_8px_24px_rgba(2,6,23,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Logo className="drop-shadow-[0_0_8px_rgba(34,211,238,0.12)]" priority size="md" variant="light" />

          <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-medium tracking-tight text-white/80 lg:flex">
            {navLinks.map((link) => (
              <Link
                className="rounded-md px-1 py-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                href={link.href}
                key={`${link.href}-${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center justify-end gap-4 md:flex">
          <Link
            className="rounded-lg px-2.5 py-2 text-sm font-medium tracking-tight text-white/78 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            href="/auth?mode=login"
          >
            Login
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-lg bg-teal-500 px-5 text-sm font-medium tracking-tight text-white shadow-sm shadow-teal-950/20 ring-1 ring-teal-300/20 transition hover:bg-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            href="/auth"
          >
            Post Requirement
          </Link>
        </div>

        <div className="flex items-center gap-2.5 md:hidden">
          <Link
            className="inline-flex h-9 items-center justify-center rounded-lg bg-teal-500 px-3 text-xs font-medium text-white shadow-sm shadow-teal-950/20 ring-1 ring-teal-300/20 transition hover:bg-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200"
            href="/auth"
          >
            Post Requirement
          </Link>
          <details className="group relative">
          <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white shadow-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">
            <span className="sr-only">Open navigation menu</span>
            <span className="grid gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:translate-y-2 group-open:rotate-45" />
              <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:opacity-0" />
              <span className="block h-0.5 w-5 rounded-full bg-current transition group-open:-translate-y-2 group-open:-rotate-45" />
            </span>
          </summary>
          <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-white/10 bg-slate-950/98 p-2.5 shadow-xl shadow-slate-950/55 ring-1 ring-teal-300/10 backdrop-blur-xl">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              <Link className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/82 transition hover:bg-white/5 hover:text-teal-300" href="/auth?mode=login">
                Login
              </Link>
              <div className="my-1 h-px bg-white/10" />
              {mobileLinks.map((link) => (
                <Link className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/82 transition hover:bg-white/5 hover:text-teal-300" href={link.href} key={`${link.href}-${link.label}`}>
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
