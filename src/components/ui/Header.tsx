import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="page-shell flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
        <Link className="text-lg font-extrabold text-brand-dark" href="/">
          RKISPro
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/customer/login">Customer</Link>
          <Link href="/vendor/login">Vendor</Link>
          <Link href="/admin/login">Admin</Link>
        </nav>
        <Button href="/customer/register">Submit Requirement</Button>
      </div>
    </header>
  );
}
