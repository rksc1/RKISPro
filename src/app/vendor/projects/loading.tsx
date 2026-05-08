import { Card } from "@/components/ui/Card";

export default function LoadingVendorProjects() {
  return (
    <div className="grid gap-4 p-6">
      <Card><p className="text-sm text-muted">Loading assigned projects...</p></Card>
    </div>
  );
}
