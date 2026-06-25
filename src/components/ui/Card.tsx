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
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: "rgba(14, 30, 39, 0.8)",
        border: "1px solid rgba(30, 52, 68, 0.8)",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {children}
    </section>
  );
}
