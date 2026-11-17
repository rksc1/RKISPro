import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import { getSupabase } from "@/lib/db";
import type { ProjectRow } from "@/models/Project";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const admin = await getAdminFromCookie();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await params;
  
  const supabase = getSupabase();
  
  const { data: project, error } = await supabase
    .from("projects")
    .update({
      status: "in_progress",
      updated_at: new Date().toISOString()
    })
    .eq("id", projectId)
    .select("*")
    .single<ProjectRow>();

  if (error || !project) {
    return NextResponse.json({ error: "Failed to unlock project" }, { status: 500 });
  }

  await Promise.all([
    createNotifications([
      {
        userRole: "customer",
        userId: project.customer_id,
        title: "Project Unlocked",
        message: `Vendor mobilization complete. The project workspace is now unlocked!`,
        type: "success",
        link: `/customer/projects/${project.id}`
      },
      {
        userRole: "vendor",
        userId: project.vendor_id,
        title: "Project Unlocked",
        message: `Commission payment verified. You may now contact the customer.`,
        type: "success",
        link: `/vendor/projects/${project.id}`
      }
    ]),
    createActivityLog({
      actorRole: "admin",
      actorId: admin.id,
      entityType: "project",
      entityId: project.id,
      action: "unlocked",
      description: `${admin.name} verified commission and unlocked project.`
    })
  ]);

  return NextResponse.redirect(new URL(`/admin/projects/${project.id}`, request.url), 303);
}
