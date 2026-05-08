import type { Notification } from "@/models/Notification";
import { NotificationBadge } from "@/components/ui/NotificationBadge";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function NotificationDropdown({
  notifications,
  role
}: {
  notifications: Notification[];
  role: "customer" | "vendor" | "admin";
}) {
  return (
    <div className="absolute right-0 z-20 mt-3 w-[min(24rem,calc(100vw-2rem))] rounded-lg border border-line bg-white p-3 shadow-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-brand-dark">Notifications</p>
        <a className="text-xs font-bold text-brand" href={`/${role}/notifications`}>View all</a>
      </div>

      {notifications.length === 0 ? (
        <p className="rounded-md bg-canvas p-4 text-sm text-muted">No notifications yet.</p>
      ) : (
        <div className="grid max-h-96 gap-2 overflow-y-auto">
          {notifications.map((notification) => (
            <form action={`/api/notifications/${notification.id}/read`} method="post" key={notification.id}>
              <input name="redirectTo" type="hidden" value={notification.link ?? `/${role}/notifications`} />
              <button
                className={`w-full rounded-md border p-3 text-left transition hover:border-brand ${
                  notification.isRead ? "border-line bg-white" : "border-brand-gold bg-amber-50/60"
                }`}
                type="submit"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-brand-dark">{notification.title}</p>
                  <NotificationBadge type={notification.type} />
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted">{notification.message}</p>
                <p className="mt-2 text-[11px] font-semibold text-muted">{formatDate(notification.createdAt)}</p>
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
