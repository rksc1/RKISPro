import { NextResponse, type NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { getAdmins } from "@/services/admin-service";
import { createActivityLog, createNotification, createNotifications } from "@/services/notification-service";
import { awardProject } from "@/services/project-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  const customer = await getCustomerFromCookie();

  if (!customer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const quoteId = String(formData.get("quoteId") ?? "");

  if (!quoteId) {
    return NextResponse.json({ error: "Quote is required" }, { status: 400 });
  }

  try {
    const { requestId } = await params;
    const project = await awardProject({ customerId: customer.id, requestId, quoteId });
    const admins = await getAdmins();

    await Promise.all([
      createNotification({
        userRole: "vendor",
        userId: project.vendorId,
        title: "Project awarded",
        message: "A customer selected your quote. The project is now awarded to you.",
        type: "success",
        link: `/vendor/projects/${project.id}`
      }),
      createNotifications(
        admins.map((admin) => ({
          userRole: "admin",
          userId: admin.id,
          title: "Project awarded",
          message: `${customer.name} selected a vendor and created a project.`,
          type: "success",
          link: `/admin/projects/${project.id}`
        }))
      ),
      createActivityLog({
        actorRole: "customer",
        actorId: customer.id,
        entityType: "project",
        entityId: project.id,
        action: "awarded",
        description: `${customer.name} selected a vendor for an RFQ.`,
        metadata: { requestId, quoteId, vendorId: project.vendorId }
      })
    ]);
    return NextResponse.redirect(new URL("/customer/projects", request.url), 303);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Project award failed" }, { status: 400 });
  }
}
