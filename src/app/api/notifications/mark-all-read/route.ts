import { NextResponse, type NextRequest } from "next/server";
import { getCurrentSessionFromCookie } from "@/lib/auth";
import { markAllNotificationsRead } from "@/services/notification-service";

function safeRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function POST(request: NextRequest) {
  const session = await getCurrentSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  await markAllNotificationsRead(session.role, session.id);

  return NextResponse.redirect(new URL(safeRedirectPath(String(formData.get("redirectTo") ?? "")), request.url), 303);
}
