import { NextResponse, type NextRequest } from "next/server";
import { getVendorFromCookie } from "@/lib/auth";
import { getAdmins } from "@/services/admin-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import { updateMilestone } from "@/services/project-milestone-service";
import { getProjectDetailForRole } from "@/services/project-service";
import { isApprovedVendor } from "@/services/vendor-service";
import type { MilestoneStatus } from "@/types/auth";

import { uploadFiles, uploadFolders } from "@/lib/upload-file";

function isVendorMilestoneStatus(value: string): value is Extract<MilestoneStatus, "in_progress" | "in_review" | "completed" | "delayed"> {
  return value === "in_progress" || value === "in_review" || value === "completed" || value === "delayed";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; milestoneId: string }> }
) {
  const vendor = await getVendorFromCookie();
  if (!vendor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await isApprovedVendor(vendor.id))) {
    return NextResponse.json({ error: "Vendor account must be approved before updating project milestones" }, { status: 403 });
  }

  const { projectId, milestoneId } = await params;
  const project = await getProjectDetailForRole({ projectId, role: "vendor", userId: vendor.id });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const formData = await request.formData();
  const status = String(formData.get("status") ?? "");
  if (!isVendorMilestoneStatus(status)) return NextResponse.json({ error: "Invalid milestone status" }, { status: 400 });

  const note = String(formData.get("progressNote") ?? "").trim();
  const files = formData.getAll("attachments").filter((file): file is File => file instanceof File);
  
  let attachmentUrls: string[] = [];
  if (files.length > 0) {
    const uploads = await uploadFiles(files, uploadFolders.milestoneProof);
    attachmentUrls = uploads.map((u) => u.secure_url);
  }

  const milestone = project.milestones.find((item) => item.id === milestoneId);
  
  // Keep existing attachments if any
  const existingUrls = milestone?.attachmentUrls || [];
  const finalUrls = [...existingUrls, ...attachmentUrls];

  const updatedMilestone = await updateMilestone({
    projectId,
    milestoneId,
    description: note ? `${milestone?.description ?? ""}\nProgress note: ${note}`.trim() : undefined,
    status,
    attachmentUrls: finalUrls.length > 0 ? finalUrls : undefined
  });

  const admins = await getAdmins();
  const notifications = [
    {
      userRole: "customer" as const,
      userId: project.customerId,
      title: "Milestone updated",
      message: `Milestone "${updatedMilestone.title}" is now ${status.replaceAll("_", " ")}.`,
      type: status === "completed" ? ("success" as const) : status === "delayed" ? ("warning" as const) : ("info" as const),
      link: `/customer/projects/${projectId}`
    },
    ...admins.map((admin) => ({
      userRole: "admin" as const,
      userId: admin.id,
      title: "Vendor milestone update",
      message: `${vendor.name} marked "${updatedMilestone.title}" as ${status.replaceAll("_", " ")}.`,
      type: status === "completed" ? ("success" as const) : status === "delayed" ? ("warning" as const) : ("info" as const),
      link: `/admin/projects/${projectId}`
    }))
  ];

  await Promise.all([
    createNotifications(notifications),
    createActivityLog({
      actorRole: "vendor",
      actorId: vendor.id,
      entityType: "milestone",
      entityId: updatedMilestone.id,
      action: status,
      description: `${vendor.name} updated milestone "${updatedMilestone.title}" to ${status}.`,
      metadata: { projectId }
    })
  ]);

  return NextResponse.redirect(new URL(`/vendor/projects/${projectId}`, request.url), 303);
}
