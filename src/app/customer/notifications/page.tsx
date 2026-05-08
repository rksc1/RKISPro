import { redirect } from "next/navigation";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { NotificationList } from "@/components/ui/NotificationList";
import { getCustomerFromCookie } from "@/lib/auth";
import { getUserNotifications } from "@/services/notification-service";

export default async function CustomerNotificationsPage() {
  const customer = await getCustomerFromCookie();
  if (!customer) redirect("/customer/login");

  const notifications = await getUserNotifications({
    userRole: "customer",
    userId: customer.id
  });

  return (
    <CustomerLayout title="Notifications">
      <NotificationList notifications={notifications} role="customer" />
    </CustomerLayout>
  );
}
