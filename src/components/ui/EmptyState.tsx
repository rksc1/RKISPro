import { Card } from "@/components/ui/Card";

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
        <div className="grid size-14 place-items-center rounded-2xl bg-canvas text-2xl font-black text-brand-gold">
          RK
        </div>
        <h2 className="text-xl font-black text-slate-950">{title}</h2>
        <p className="max-w-xl text-sm leading-6 text-muted">{description}</p>
      </div>
    </Card>
  );
}
