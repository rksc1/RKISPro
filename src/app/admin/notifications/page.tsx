import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { NotificationList } from "@/components/ui/NotificationList";
import { getAdminFromCookie } from "@/lib/auth";
import { getUserNotifications } from "@/services/notification-service";

export default async function AdminNotificationsPage() {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/auth?mode=login");

  const notifications = await getUserNotifications({
    userRole: "admin",
    userId: admin.id
  });

  return (
    <AdminLayout title="Notifications">
      <NotificationList notifications={notifications} role="admin" />
    </AdminLayout>
  );
}
