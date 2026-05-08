import { Card } from "@/components/ui/Card";

export function ProjectInfoCard({
  title,
  items
}: {
  title: string;
  items: Array<{ label: string; value?: string | number | null }>;
}) {
  return (
    <Card>
      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <div className="mt-4 grid gap-3 text-sm">
        {items.map((item) => (
          <span className="grid gap-1" key={item.label}>
            <strong>{item.label}</strong>
            <span className="text-muted">{item.value || "Not set"}</span>
          </span>
        ))}
      </div>
    </Card>
  );
}
