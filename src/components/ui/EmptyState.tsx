import { Card } from "@/components/ui/Card";
import { LogoMark } from "@/components/ui/LogoMark";

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <div className="grid place-items-center gap-3 py-10 text-center">
        <LogoMark className="ring-1 ring-line" size="lg" />
        <h2 className="text-xl font-black text-slate-950">{title}</h2>
        <p className="max-w-xl text-sm leading-6 text-muted">{description}</p>
      </div>
    </Card>
  );
}
