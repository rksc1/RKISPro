import { AmountDisplay } from "@/components/ui/AmountDisplay";
import { Card } from "@/components/ui/Card";

export function FinancialSummaryCard({
  label,
  amount,
  detail
}: {
  label: string;
  amount: number;
  detail?: string;
}) {
  return (
    <Card>
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-950">
        <AmountDisplay amount={amount} />
      </p>
      {detail ? <p className="mt-1 text-xs font-semibold text-muted">{detail}</p> : null}
    </Card>
  );
}
