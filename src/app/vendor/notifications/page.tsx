import { redirect } from "next/navigation";
import { VendorLayout } from "@/components/layout/VendorLayout";
import { NotificationList } from "@/components/ui/NotificationList";
import { getVendorFromCookie } from "@/lib/auth";
import { getUserNotifications } from "@/services/notification-service";

export default async function VendorNotificationsPage() {
  const vendor = await getVendorFromCookie();
  if (!vendor) redirect("/auth?mode=login");

  const notifications = await getUserNotifications({
    userRole: "vendor",
    userId: vendor.id
  });

  return (
    <VendorLayout title="Notifications">
      <NotificationList notifications={notifications} role="vendor" />
    </VendorLayout>
  );
}
