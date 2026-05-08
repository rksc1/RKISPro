import { getSupabase } from "@/lib/db";
import type { ActivityLog, ActivityLogRow } from "@/models/ActivityLog";
import type { Notification, NotificationRow } from "@/models/Notification";
import type { ActivityEntityType, NotificationType, Role } from "@/types/auth";
import type { Json } from "@/types/supabase";

function mapNotification(row: NotificationRow): Notification {
  return {
    id: row.id,
    userRole: row.user_role,
    userId: row.user_id,
    title: row.title,
    message: row.message,
    type: row.type,
    link: row.link,
    isRead: row.is_read,
    createdAt: row.created_at
  };
}

function mapActivityLog(row: ActivityLogRow): ActivityLog {
  return {
    id: row.id,
    actorRole: row.actor_role,
    actorId: row.actor_id,
    entityType: row.entity_type,
    entityId: row.entity_id,
    action: row.action,
    description: row.description,
    metadata: row.metadata,
    createdAt: row.created_at
  };
}

export async function createNotification(input: {
  userRole: Role;
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  link?: string | null;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_role: input.userRole,
      user_id: input.userId,
      title: input.title,
      message: input.message,
      type: input.type ?? "info",
      link: input.link ?? null
    })
    .select("*")
    .single<NotificationRow>();

  if (error) throw new Error(error.message);
  return mapNotification(data);
}

export async function createNotifications(
  notifications: Array<Parameters<typeof createNotification>[0]>
) {
  if (notifications.length === 0) return [];

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("notifications")
    .insert(
      notifications.map((item) => ({
        user_role: item.userRole,
        user_id: item.userId,
        title: item.title,
        message: item.message,
        type: item.type ?? "info",
        link: item.link ?? null
      }))
    )
    .select("*")
    .returns<NotificationRow[]>();

  if (error) throw new Error(error.message);
  return data.map(mapNotification);
}

export async function getUserNotifications(input: {
  userRole: Role;
  userId: string;
  limit?: number;
}) {
  const supabase = getSupabase();
  let query = supabase
    .from("notifications")
    .select("*")
    .eq("user_role", input.userRole)
    .eq("user_id", input.userId)
    .order("created_at", { ascending: false });

  if (input.limit) query = query.limit(input.limit);

  const { data, error } = await query.returns<NotificationRow[]>();
  if (error) throw new Error(error.message);
  return data.map(mapNotification);
}

export async function getUnreadNotificationCount(userRole: Role, userId: string) {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_role", userRole)
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function markNotificationRead(input: {
  notificationId: string;
  userRole: Role;
  userId: string;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", input.notificationId)
    .eq("user_role", input.userRole)
    .eq("user_id", input.userId)
    .select("*")
    .maybeSingle<NotificationRow>();

  if (error) throw new Error(error.message);
  return data ? mapNotification(data) : null;
}

export async function markAllNotificationsRead(userRole: Role, userId: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_role", userRole)
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}

export async function createActivityLog(input: {
  actorRole: Role;
  actorId?: string | null;
  entityType: ActivityEntityType | string;
  entityId?: string | null;
  action: string;
  description?: string | null;
  metadata?: Json | null;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("activity_logs")
    .insert({
      actor_role: input.actorRole,
      actor_id: input.actorId ?? null,
      entity_type: input.entityType,
      entity_id: input.entityId ?? null,
      action: input.action,
      description: input.description ?? null,
      metadata: input.metadata ?? null
    })
    .select("*")
    .single<ActivityLogRow>();

  if (error) throw new Error(error.message);
  return mapActivityLog(data);
}

export async function getActivityLogs(filters: {
  entityType?: string;
  actorRole?: Role | "";
  limit?: number;
}) {
  const supabase = getSupabase();
  let query = supabase.from("activity_logs").select("*").order("created_at", { ascending: false });

  if (filters.entityType) query = query.eq("entity_type", filters.entityType);
  if (filters.actorRole) query = query.eq("actor_role", filters.actorRole);
  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query.returns<ActivityLogRow[]>();
  if (error) throw new Error(error.message);
  return data.map(mapActivityLog);
}
