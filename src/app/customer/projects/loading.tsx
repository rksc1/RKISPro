import { Card } from "@/components/ui/Card";

export default function LoadingCustomerProjects() {
  return (
    <div className="grid gap-4 p-6">
      <Card><p className="text-sm text-muted">Loading projects...</p></Card>
    </div>
  );
}
