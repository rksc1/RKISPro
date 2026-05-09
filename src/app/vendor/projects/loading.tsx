import { Card } from "@/components/ui/Card";
import { BrandedLoader } from "@/components/ui/BrandedLoader";

export default function LoadingVendorProjects() {
  return (
    <div className="grid gap-4 p-6">
      <Card><BrandedLoader label="Loading assigned projects" /></Card>
    </div>
  );
}
