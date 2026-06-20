import { NextResponse, type NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import { updateMilestone } from "@/services/project-milestone-service";
import { getProjectDetailForRole } from "@/services/project-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; milestoneId: string }> }
) {
  const customer = await getCustomerFromCookie();
  if (!customer) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId, milestoneId } = await params;
  const project = await getProjectDetailForRole({ projectId, role: "customer", userId: customer.id });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const milestone = project.milestones.find((item) => item.id === milestoneId);
  if (!milestone) return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
  if (milestone.status !== "in_review") return NextResponse.json({ error: "Milestone is not in review" }, { status: 400 });

  const updatedMilestone = await updateMilestone({
    projectId,
    milestoneId,
    status: "completed"
  });

  const notifications = [
    {
      userRole: "vendor" as const,
      userId: project.vendorId,
      title: "Milestone approved",
      message: `The customer approved your milestone "${updatedMilestone.title}".`,
      type: "success" as const,
      link: `/vendor/projects/${projectId}`
    }
  ];

  await Promise.all([
    createNotifications(notifications),
    createActivityLog({
      actorRole: "customer",
      actorId: customer.id,
      entityType: "milestone",
      entityId: updatedMilestone.id,
      action: "completed",
      description: `${customer.name} approved the milestone "${updatedMilestone.title}".`,
      metadata: { projectId }
    })
  ]);

  return NextResponse.redirect(new URL(`/customer/projects/${projectId}`, request.url), 303);
}
