import { NextResponse, type NextRequest } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { createActivityLog } from "@/services/notification-service";
import { deleteMilestone, updateMilestone } from "@/services/project-milestone-service";
import { getProjectDetailForRole } from "@/services/project-service";
import type { MilestoneStatus } from "@/types/auth";

function isMilestoneStatus(value: string): value is MilestoneStatus {
  return value === "pending" || value === "in_progress" || value === "completed" || value === "delayed" || value === "cancelled";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; milestoneId: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId, milestoneId } = await params;
  const project = await getProjectDetailForRole({ projectId, role: "admin", userId: admin.id });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const formData = await request.formData();
  if (String(formData.get("_method") ?? "") === "delete") {
    await deleteMilestone(projectId, milestoneId);
    await createActivityLog({
      actorRole: "admin",
      actorId: admin.id,
      entityType: "milestone",
      entityId: milestoneId,
      action: "deleted",
      description: `${admin.name} deleted a milestone.`,
      metadata: { projectId }
    });
    return NextResponse.redirect(new URL(`/admin/projects/${projectId}`, request.url), 303);
  }

  const status = String(formData.get("status") ?? "");
  if (!isMilestoneStatus(status)) return NextResponse.json({ error: "Invalid milestone status" }, { status: 400 });

  const milestone = await updateMilestone({
    projectId,
    milestoneId,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    dueDate: String(formData.get("dueDate") ?? ""),
    status
  });

  await createActivityLog({
    actorRole: "admin",
    actorId: admin.id,
    entityType: "milestone",
    entityId: milestone.id,
    action: "updated",
    description: `${admin.name} updated milestone "${milestone.title}".`,
    metadata: { projectId, status }
  });

  return NextResponse.redirect(new URL(`/admin/projects/${projectId}`, request.url), 303);
}
