import { Card } from "@/components/ui/Card";

export default function LoadingCustomerQuotes() {
  return (
    <div className="grid gap-4 p-6">
      <Card><p className="text-sm text-muted">Loading approved quotations...</p></Card>
      <Card><div className="h-28 animate-pulse rounded-md bg-canvas" /></Card>
    </div>
  );
}
