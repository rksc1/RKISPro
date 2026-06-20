import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import { updateProject } from "@/services/project-service";
import type { ProjectStatus } from "@/types/auth";

function isProjectStatus(value: string): value is ProjectStatus {
  return value === "awarded" || value === "in_progress" || value === "on_hold" || value === "completed" || value === "cancelled";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const admin = await getAdminFromCookie();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");

  if (!isProjectStatus(status)) {
    return NextResponse.json({ error: "Invalid project status" }, { status: 400 });
  }

  const { projectId } = await params;
  const project = await updateProject({
    projectId,
    status,
    expectedDeliveryDate: String(formData.get("expectedDeliveryDate") ?? ""),
    actualDeliveryDate: String(formData.get("actualDeliveryDate") ?? ""),
    adminNotes: String(formData.get("adminNotes") ?? "")
  });

  await Promise.all([
    createNotifications([
      {
        userRole: "customer",
        userId: project.customerId,
        title: "Project updated",
        message: `Project status changed to ${status.replaceAll("_", " ")}.`,
        type: status === "completed" ? "success" : "info",
        link: `/customer/projects/${project.id}`
      },
      {
        userRole: "vendor",
        userId: project.vendorId,
        title: "Project updated",
        message: `Project status changed to ${status.replaceAll("_", " ")}.`,
        type: status === "completed" ? "success" : "info",
        link: `/vendor/projects/${project.id}`
      }
    ]),
    createActivityLog({
      actorRole: "admin",
      actorId: admin.id,
      entityType: "project",
      entityId: project.id,
      action: "updated",
      description: `${admin.name} updated project status to ${status}.`
    })
  ]);

  return NextResponse.redirect(new URL("/admin/projects", request.url), 303);
}
