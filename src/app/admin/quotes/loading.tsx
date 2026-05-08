import { Card } from "@/components/ui/Card";

export default function LoadingAdminQuotes() {
  return (
    <div className="grid gap-4 p-6">
      <Card><p className="text-sm text-muted">Loading quote review...</p></Card>
      <Card><div className="h-28 animate-pulse rounded-md bg-canvas" /></Card>
    </div>
  );
}
