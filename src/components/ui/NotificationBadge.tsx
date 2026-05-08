import type { NotificationType } from "@/types/auth";

const styles: Record<NotificationType, string> = {
  info: "bg-blue-50 text-blue-700 ring-blue-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  error: "bg-red-50 text-red-700 ring-red-200"
};

export function NotificationBadge({ type }: { type: NotificationType }) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold capitalize ring-1 ${styles[type]}`}>
      {type}
    </span>
  );
}
