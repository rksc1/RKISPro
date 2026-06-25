import type { ReactNode } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10"
      style={{ background: "linear-gradient(160deg, #060E14 0%, #0A1825 55%, #0E1E27 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,196,204,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="relative w-full max-w-xl rounded-2xl p-8"
        style={{
          background: "rgba(14, 30, 39, 0.85)",
          border: "1px solid rgba(0, 196, 204, 0.12)",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,196,204,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="grid gap-6">
          <div className="grid justify-items-center text-center gap-3">
            <BrandLogo size="md" variant="light" />
            <div>
              <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
              <p className="mt-1.5 text-sm text-navy-100">{description}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
