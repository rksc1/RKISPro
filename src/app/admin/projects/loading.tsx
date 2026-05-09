import { Card } from "@/components/ui/Card";
import { BrandedLoader } from "@/components/ui/BrandedLoader";

export default function LoadingAdminProjects() {
  return (
    <div className="grid gap-4 p-6">
      <Card><BrandedLoader label="Loading project operations" /></Card>
    </div>
  );
}
