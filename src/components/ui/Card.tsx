import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl p-5 bg-surface border border-edge shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}
