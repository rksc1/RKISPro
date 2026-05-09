export function AmountDisplay({
  amount,
  className = ""
}: {
  amount: number;
  className?: string;
}) {
  return <span className={className}>Rs. {Number(amount).toLocaleString("en-IN")}</span>;
}
