import { Card } from "@/components/ui/Card";
import { BrandedLoader } from "@/components/ui/BrandedLoader";

export default function LoadingAdminQuotes() {
  return (
    <div className="grid gap-4 p-6">
      <Card><BrandedLoader label="Loading quote review" /></Card>
      <Card><div className="h-28 animate-pulse rounded-md bg-canvas" /></Card>
    </div>
  );
}
