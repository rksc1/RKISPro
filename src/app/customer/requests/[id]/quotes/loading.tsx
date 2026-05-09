import { Card } from "@/components/ui/Card";
import { BrandedLoader } from "@/components/ui/BrandedLoader";

export default function LoadingCustomerQuotes() {
  return (
    <div className="grid gap-4 p-6">
      <Card><BrandedLoader label="Loading approved quotations" /></Card>
      <Card><div className="h-28 animate-pulse rounded-md bg-canvas" /></Card>
    </div>
  );
}
