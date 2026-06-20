import { NextResponse, type NextRequest } from "next/server";
import { getCurrentSessionFromCookie } from "@/lib/auth";
import { uploadFiles, uploadFolders } from "@/lib/upload-file";
import { createProjectMessage, getProjectMessages } from "@/services/message-service";
import { getProjectDetailForRole } from "@/services/project-service";
import { createNotifications } from "@/services/notification-service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const session = await getCurrentSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;
  
  // Verify access
  const project = await getProjectDetailForRole({ projectId, role: session.role, userId: session.id });
  if (!project) return NextResponse.json({ error: "Project not found or access denied" }, { status: 404 });

  try {
    const messages = await getProjectMessages(projectId);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const session = await getCurrentSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;
  
  // Verify access
  const project = await getProjectDetailForRole({ projectId, role: session.role, userId: session.id });
  if (!project) return NextResponse.json({ error: "Project not found or access denied" }, { status: 404 });

  const formData = await request.formData();
  const content = String(formData.get("content") ?? "").trim();
  const files = formData.getAll("attachments").filter((file): file is File => file instanceof File);

  if (!content && files.length === 0) {
    return NextResponse.json({ error: "Message content or attachments required" }, { status: 400 });
  }

  try {
    let attachmentUrls: string[] = [];
    if (files.length > 0) {
      const uploads = await uploadFiles(files, uploadFolders.projectMessages);
      attachmentUrls = uploads.map((u) => u.secure_url);
    }

    const message = await createProjectMessage({
      projectId,
      senderRole: session.role,
      senderId: session.id,
      content,
      attachmentUrls
    });

    // Notify the other party
    if (session.role === "customer" || session.role === "vendor") {
      const targetRole = session.role === "customer" ? "vendor" : "customer";
      const targetId = session.role === "customer" ? project.vendorId : project.customerId;
      const senderName = session.role === "customer" ? (project.customer?.companyName || project.customer?.name || "Customer") : (project.vendor?.companyName || project.vendor?.ownerName || "Vendor");
      
      await createNotifications([{
        userRole: targetRole as "customer" | "vendor" | "admin",
        userId: targetId,
        title: "New Message",
        message: `${senderName} sent a new message on project "${project.request?.projectTitle || "Project"}".`,
        type: "info",
        link: `/${targetRole}/projects/${projectId}`
      }]);
    }

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
