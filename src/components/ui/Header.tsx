import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="page-shell flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
        <BrandLogo compactOnMobile size="sm" />
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/auth?mode=login">Login</Link>
        </nav>
        <Button href="/auth">Post Requirement</Button>
      </div>
    </header>
  );
}
