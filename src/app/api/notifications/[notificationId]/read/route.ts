import { NextResponse, type NextRequest } from "next/server";
import { getCurrentSessionFromCookie } from "@/lib/auth";
import { markNotificationRead } from "@/services/notification-service";

function safeRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  const session = await getCurrentSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const redirectTo = safeRedirectPath(String(formData.get("redirectTo") ?? ""));
  const { notificationId } = await params;

  await markNotificationRead({
    notificationId,
    userRole: session.role,
    userId: session.id
  });

  return NextResponse.redirect(new URL(redirectTo, request.url), 303);
}
