import { NextResponse, type NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { uploadFiles, uploadFolders } from "@/lib/upload-file";
import { getAdmins } from "@/services/admin-service";
import { createMarketplaceRequest } from "@/services/marketplace-request-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";

function required(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export async function POST(request: NextRequest) {
  const customer = await getCustomerFromCookie();

  if (!customer) {
    return NextResponse.redirect(new URL("/auth?mode=login", request.url), 303);
  }

  const formData = await request.formData();
  const input = {
    projectTitle: required(formData.get("projectTitle")),
    description: required(formData.get("description")),
    serviceType: required(formData.get("serviceType")),
    materialType: required(formData.get("materialType")),
    location: required(formData.get("location")),
    deadline: required(formData.get("expectedDeadline")),
    technicalRequirements: required(formData.get("technicalRequirements")),
    quantity: required(formData.get("quantity")),
    qualityExpectations: required(formData.get("qualityExpectations")),
    budgetRange: required(formData.get("budgetRange")),
    inspectionRequirement: required(formData.get("inspectionRequirement")),
    gstRequirement: formData.get("gstRequirement") === "true"
  };

  if (
    !input.projectTitle ||
    !input.description ||
    !input.serviceType ||
    !input.materialType ||
    !input.location ||
    !input.deadline
  ) {
    return NextResponse.json({ error: "Missing required RFQ fields" }, { status: 400 });
  }

  try {
    const drawings = formData.getAll("drawings").filter((file): file is File => file instanceof File);
    const uploads = await uploadFiles(drawings, uploadFolders.rfqDocuments);

    const marketplaceRequest = await createMarketplaceRequest({
      customerId: customer.id,
      ...input,
      drawingUrls: uploads.map((upload) => upload.secure_url)
    });
    const admins = await getAdmins();

    await createNotifications(
      admins.map((admin) => ({
        userRole: "admin",
        userId: admin.id,
        title: "New RFQ submitted",
        message: `${customer.name} submitted "${marketplaceRequest.projectTitle}" for review.`,
        type: "info",
        link: `/admin/requests/${marketplaceRequest.id}`
      }))
    );
    await createActivityLog({
      actorRole: "customer",
      actorId: customer.id,
      entityType: "rfq",
      entityId: marketplaceRequest.id,
      action: "created",
      description: `${customer.name} submitted RFQ "${marketplaceRequest.projectTitle}".`
    });

    return NextResponse.redirect(new URL("/customer/dashboard", request.url), 303);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "RFQ creation failed" }, { status: 400 });
  }
}
