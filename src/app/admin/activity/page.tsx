import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ActivityTimeline } from "@/components/ui/ActivityTimeline";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getAdminFromCookie } from "@/lib/auth";
import { getActivityLogs } from "@/services/notification-service";
import type { Role } from "@/types/auth";

const actorRoles: Array<Role | ""> = ["", "customer", "vendor", "admin"];
const entityTypes = ["", "rfq", "quote", "project", "milestone", "vendor"];

export default async function AdminActivityPage({
  searchParams
}: {
  searchParams: Promise<{ entityType?: string; actorRole?: Role | "" }>;
}) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/admin/login");

  const filters = await searchParams;
  const logs = await getActivityLogs({
    entityType: filters.entityType ?? "",
    actorRole: filters.actorRole ?? "",
    limit: 100
  });

  return (
    <AdminLayout title="Activity Log">
      <Card>
        <form className="grid gap-4 md:grid-cols-[1fr_1fr_auto]" method="get">
          <label className="grid gap-2 text-sm font-semibold">
            Entity type
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="entityType" defaultValue={filters.entityType ?? ""}>
              {entityTypes.map((type) => (
                <option key={type || "all"} value={type}>{type ? type.toUpperCase() : "All entities"}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Actor role
            <select className="min-h-11 rounded-md border border-line bg-white px-3" name="actorRole" defaultValue={filters.actorRole ?? ""}>
              {actorRoles.map((role) => (
                <option key={role || "all"} value={role}>{role ? role.toUpperCase() : "All roles"}</option>
              ))}
            </select>
          </label>
          <div className="flex items-end gap-2">
            <Button type="submit">Filter</Button>
            <Button href="/admin/activity" variant="secondary">Reset</Button>
          </div>
        </form>
      </Card>
      <ActivityTimeline logs={logs} />
    </AdminLayout>
  );
}
