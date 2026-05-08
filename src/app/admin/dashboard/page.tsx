import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { getAdminDashboardStats } from "@/services/admin-service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <AdminLayout title="Admin dashboard">
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Total customers" value={stats.totalCustomers} note="Registered customer accounts" />
        <StatCard label="Total vendors" value={stats.totalVendors} note="Registered vendor profiles" />
        <StatCard label="Pending approvals" value={stats.pendingVendorApprovals} note="Vendor profiles awaiting review" />
      </div>
      <Card>
        <h2 id="requests" className="text-xl font-bold">Requests placeholder</h2>
        <p className="mt-3 text-sm text-muted">Customer request review will be implemented when the RFQ engine is built.</p>
      </Card>
    </AdminLayout>
  );
}
