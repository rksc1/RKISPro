import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import { createMilestone } from "@/services/project-milestone-service";
import { getProjectDetailForRole } from "@/services/project-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;
  const project = await getProjectDetailForRole({ projectId, role: "admin", userId: admin.id });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return NextResponse.json({ error: "Milestone title is required" }, { status: 400 });

  const milestone = await createMilestone({
    projectId,
    title,
    description: String(formData.get("description") ?? "").trim(),
    dueDate: String(formData.get("dueDate") ?? ""),
    createdByRole: "admin",
    createdById: admin.id
  });

  await Promise.all([
    createNotifications([
      {
        userRole: "customer",
        userId: project.customerId,
        title: "Milestone added",
        message: `RKISPro added milestone "${milestone.title}" to your project.`,
        type: "info",
        link: `/customer/projects/${projectId}`
      },
      {
        userRole: "vendor",
        userId: project.vendorId,
        title: "Milestone added",
        message: `RKISPro added milestone "${milestone.title}" to your project.`,
        type: "info",
        link: `/vendor/projects/${projectId}`
      }
    ]),
    createActivityLog({
      actorRole: "admin",
      actorId: admin.id,
      entityType: "milestone",
      entityId: milestone.id,
      action: "created",
      description: `${admin.name} created milestone "${milestone.title}".`,
      metadata: { projectId }
    })
  ]);

  return NextResponse.redirect(new URL(`/admin/projects/${projectId}`, request.url), 303);
}
