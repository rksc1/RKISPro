import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ServiceModeCard({
  icon,
  title,
  subtitle,
  examples,
  cta,
  href
}: {
  icon: string;
  title: string;
  subtitle: string;
  examples: string[];
  cta: string;
  href: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-4 top-4 text-4xl opacity-20">{icon}</div>
      <div className="grid min-h-72 gap-5">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-dark text-xl text-white">{icon}</div>
          <h2 className="mt-5 text-2xl font-black text-slate-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-brand-dark" key={example}>
              {example}
            </span>
          ))}
        </div>
        <div className="flex items-end">
          <Button href={href}>{cta}</Button>
        </div>
      </div>
    </Card>
  );
}
