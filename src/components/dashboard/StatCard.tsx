import { Card } from "@/components/ui/Card";

export function StatCard({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <Card>
      <div className="grid gap-2">
        <span className="text-sm font-semibold text-muted">{label}</span>
        <strong className="text-3xl">{value}</strong>
        <span className="text-sm text-muted">{note}</span>
      </div>
    </Card>
  );
}
