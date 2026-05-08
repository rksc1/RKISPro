import type { Notification } from "@/models/Notification";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { NotificationBadge } from "@/components/ui/NotificationBadge";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function NotificationList({
  notifications,
  role
}: {
  notifications: Notification[];
  role: "customer" | "vendor" | "admin";
}) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        title="No notifications yet"
        description="Important RFQ, quote, and project updates will appear here."
      />
    );
  }

  return (
    <div className="grid gap-3">
      <form action="/api/notifications/mark-all-read" className="flex justify-end" method="post">
        <input name="redirectTo" type="hidden" value={`/${role}/notifications`} />
        <Button type="submit" variant="secondary">Mark all as read</Button>
      </form>

      {notifications.map((notification) => (
        <Card className={notification.isRead ? "bg-white" : "border-brand-gold bg-amber-50/40"} key={notification.id}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="grid gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-brand-dark">{notification.title}</h2>
                <NotificationBadge type={notification.type} />
                {!notification.isRead ? <span className="text-xs font-bold uppercase text-brand-gold">Unread</span> : null}
              </div>
              <p className="text-sm text-muted">{notification.message}</p>
              <p className="text-xs font-semibold text-muted">{formatDate(notification.createdAt)}</p>
            </div>
            <form action={`/api/notifications/${notification.id}/read`} method="post">
              <input name="redirectTo" type="hidden" value={notification.link ?? `/${role}/notifications`} />
              <Button type="submit" variant={notification.link ? "primary" : "secondary"}>
                {notification.link ? "Open" : "Mark read"}
              </Button>
            </form>
          </div>
        </Card>
      ))}
    </div>
  );
}
