import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "How it works" },
  { href: "/contact", label: "Contact" },
  { href: "/vendor/register", label: "For vendors" }
];

export function StickyNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="grid size-10 place-items-center rounded-lg bg-brand-gold font-black text-slate-950">R</span>
          <span className="grid leading-tight">
            <strong className="text-lg">RKISPro</strong>
            <span className="hidden text-xs text-slate-400 sm:inline">Industrial Marketplace</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-300 lg:flex">
          {navLinks.map((link) => (
            <Link className="hover:text-white" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="hidden text-sm font-semibold text-slate-300 hover:text-white sm:inline" href="/customer/login">
            Login
          </Link>
          <Button href="/customer/request/new">Post Requirement</Button>
        </div>
      </div>
    </header>
  );
}
