import { NextResponse, type NextRequest } from "next/server";
import { getCustomerFromCookie } from "@/lib/auth";
import { uploadFiles, uploadFolders } from "@/lib/upload-file";
import { getAdmins } from "@/services/admin-service";
import { createActivityLog, createNotifications } from "@/services/notification-service";
import {
  createQuickBooking,
  quickBookingServiceTypes,
  quickBookingUrgencies
} from "@/services/quick-booking-service";
import type { QuickBookingServiceType, QuickBookingUrgency } from "@/types/auth";

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function isServiceType(value: string): value is QuickBookingServiceType {
  return quickBookingServiceTypes.includes(value as QuickBookingServiceType);
}

function isUrgency(value: string): value is QuickBookingUrgency {
  return quickBookingUrgencies.includes(value as QuickBookingUrgency);
}

export async function POST(request: NextRequest) {
  const customer = await getCustomerFromCookie();
  if (!customer) return NextResponse.redirect(new URL("/customer/login", request.url), 303);

  const formData = await request.formData();
  const serviceType = text(formData.get("serviceType"));
  const urgency = text(formData.get("urgency")) || "normal";
  const title = text(formData.get("title"));
  const location = text(formData.get("location"));
  const budget = Number(formData.get("budget") ?? 0);

  if (!isServiceType(serviceType) || !isUrgency(urgency) || !title || !location) {
    return NextResponse.json({ error: "Missing required quick booking fields" }, { status: 400 });
  }

  try {
    const files = formData.getAll("images").filter((file): file is File => file instanceof File);
    const uploads = await uploadFiles(files, uploadFolders.quickBookingImages);
    const booking = await createQuickBooking({
      customerId: customer.id,
      serviceType,
      title,
      description: text(formData.get("description")),
      location,
      preferredDate: text(formData.get("preferredDate")),
      preferredTime: text(formData.get("preferredTime")),
      urgency,
      budget: Number.isFinite(budget) && budget > 0 ? budget : null,
      images: uploads.map((upload) => upload.secure_url)
    });

    const admins = await getAdmins();
    await Promise.all([
      createNotifications(admins.map((admin) => ({
        userRole: "admin",
        userId: admin.id,
        title: "New quick booking",
        message: `${customer.name} requested ${booking.serviceType}: ${booking.title}.`,
        type: booking.urgency === "emergency" ? "warning" : "info",
        link: `/admin/quick-bookings/${booking.id}`
      }))),
      createActivityLog({
        actorRole: "customer",
        actorId: customer.id,
        entityType: "quick_booking",
        entityId: booking.id,
        action: "created",
        description: `${customer.name} created quick booking "${booking.title}".`
      })
    ]);

    return NextResponse.redirect(new URL("/customer/quick-bookings", request.url), 303);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Quick booking failed" }, { status: 400 });
  }
}
