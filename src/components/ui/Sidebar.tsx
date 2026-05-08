import Link from "next/link";

export type SidebarLink = {
  href: string;
  label: string;
};

export function Sidebar({
  title,
  links
}: {
  title: string;
  links: SidebarLink[];
}) {
  return (
    <aside className="border-b border-line bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <details className="group" open>
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 font-bold text-brand-dark lg:cursor-default">
          {title}
          <span className="lg:hidden">Menu</span>
        </summary>
        <nav className="grid gap-1 px-3 pb-4">
          {links.map((link) => (
            <Link className="rounded-md px-3 py-2 text-sm font-semibold text-muted hover:bg-canvas hover:text-brand" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <form action="/api/auth/logout" method="post">
            <button className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-muted hover:bg-canvas hover:text-brand" type="submit">
              Logout
            </button>
          </form>
        </nav>
      </details>
    </aside>
  );
}
