import { NextResponse, type NextRequest } from "next/server";
import { uploadFile, uploadFiles, uploadFolders } from "@/lib/upload-file";
import { createVendor } from "@/services/vendor-service";
import type { VendorType } from "@/types/auth";

function required(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function numberField(value: FormDataEntryValue | null) {
  return Number(value ?? 0);
}

function listField(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function vendorType(value: string): VendorType {
  return value === "individual" ? "individual" : "company";
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const type = vendorType(required(formData.get("vendorType")));
  const fullName = required(formData.get("fullName"));
  const companyName = required(formData.get("companyName"));
  const ownerName = required(formData.get("ownerName"));
  const city = required(formData.get("city"));
  const workshopAddress = required(formData.get("workshopAddress"));
  const input = {
    vendorType: type,
    companyName: type === "individual" ? fullName : companyName,
    ownerName: type === "individual" ? fullName : ownerName,
    phone: required(formData.get("phone")),
    email: required(formData.get("email")).toLowerCase(),
    password: String(formData.get("password") ?? ""),
    gstNumber: type === "individual" ? "" : required(formData.get("gstNumber")),
    location: type === "individual" ? city : (workshopAddress || city),
    services: type === "individual" ? listField(formData.get("skillCategories")) : listField(formData.get("services")),
    machinery: type === "individual" ? [] : listField(formData.get("machinery")),
    capacity: type === "individual" ? "Individual service capacity" : required(formData.get("capacity")),
    workerCount: numberField(formData.get("workerCount")),
    experienceYears: numberField(formData.get("experienceYears")),
    logoUrl: undefined as string | undefined,
    factoryImages: [] as string[],
    fullName,
    skillCategories: listField(formData.get("skillCategories")),
    serviceRadiusKm: Number.isNaN(numberField(formData.get("serviceRadiusKm"))) ? null : numberField(formData.get("serviceRadiusKm")),
    availableForQuickBooking: formData.get("availableForQuickBooking") === "true",
    idProofUrl: undefined as string | undefined,
    profilePhotoUrl: undefined as string | undefined,
    workshopAddress,
    workshopImages: [] as string[],
    availableForLargeWork: formData.get("availableForLargeWork") === "true",
    city,
    state: required(formData.get("state")),
    panNumber: required(formData.get("panNumber")),
    agreementAccepted: formData.get("agreementAccepted") === "on",
    agreementAcceptedAt: new Date().toISOString(),
    emailRedirectTo: `${origin}/auth/callback`
  };

  const missingCommon = !input.phone || !input.email || input.password.length < 8 || Number.isNaN(input.experienceYears);
  const missingIndividual = type === "individual" && (!input.fullName || input.services.length === 0 || !input.city);
  const missingCompany = type === "company" && (!input.companyName || !input.ownerName || !input.workshopAddress || input.services.length === 0 || input.machinery.length === 0 || !input.capacity || Number.isNaN(input.workerCount));

  if (missingCommon || missingIndividual || missingCompany) {
    return NextResponse.json({ error: "Missing required vendor fields" }, { status: 400 });
  }

  if (!input.agreementAccepted) {
    return NextResponse.json({ error: "Vendor agreement acceptance is required" }, { status: 400 });
  }

  try {
    const logo = formData.get("logo");
    const profilePhoto = formData.get("profilePhoto");
    const idProof = formData.get("idProof");
    const workshopImages = formData.getAll("workshopImages").filter((file): file is File => file instanceof File);
    const logoUpload = logo instanceof File && logo.size > 0 ? await uploadFile(logo, uploadFolders.vendorLogos) : null;
    const profileUpload = profilePhoto instanceof File && profilePhoto.size > 0 ? await uploadFile(profilePhoto, uploadFolders.vendorLogos) : null;
    const idProofUpload = idProof instanceof File && idProof.size > 0 ? await uploadFile(idProof, uploadFolders.vendorFactory) : null;
    const workshopUploads = await uploadFiles(workshopImages, uploadFolders.vendorFactory);

    input.logoUrl = logoUpload?.secure_url;
    input.profilePhotoUrl = profileUpload?.secure_url;
    input.idProofUrl = idProofUpload?.secure_url;
    input.workshopImages = workshopUploads.map((upload) => upload.secure_url);
    input.factoryImages = input.workshopImages;

    await createVendor(input);

    return NextResponse.redirect(new URL(`/auth/check-email?role=vendor&email=${encodeURIComponent(input.email)}`, request.url), 303);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Registration failed" }, { status: 400 });
  }
}
