import type { Role } from "@/types/auth";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown";
import { getUnreadNotificationCount, getUserNotifications } from "@/services/notification-service";

export async function NotificationBell({ role, userId }: { role: Role; userId: string }) {
  const [notifications, unreadCount] = await Promise.all([
    getUserNotifications({ userRole: role, userId, limit: 6 }),
    getUnreadNotificationCount(role, userId)
  ]);

  return (
    <details className="group relative">
      <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-line bg-white text-lg shadow-soft transition hover:border-brand">
        <span aria-hidden="true">!</span>
        <span className="sr-only">Open notifications</span>
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-brand-gold px-1.5 py-0.5 text-center text-xs font-black text-brand-dark">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </summary>
      <NotificationDropdown notifications={notifications} role={role} />
    </details>
  );
}
