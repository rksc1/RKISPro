import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function AuthShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-xl">
        <div className="grid gap-5">
          <div className="grid justify-items-center text-center">
            <BrandLogo size="md" />
            <h1 className="mt-2 text-3xl font-bold">{title}</h1>
            <p className="mt-2 text-sm text-muted">{description}</p>
          </div>
          {children}
        </div>
      </Card>
    </main>
  );
}
