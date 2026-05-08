import { NextResponse, type NextRequest } from "next/server";
import { setRoleCookie } from "@/lib/auth";
import { uploadFile, uploadFiles, uploadFolders } from "@/lib/upload-file";
import { createVendor } from "@/services/vendor-service";

function required(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function numberField(value: FormDataEntryValue | null) {
  return Number(value ?? 0);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const input = {
    companyName: required(formData.get("companyName")),
    ownerName: required(formData.get("ownerName")),
    phone: required(formData.get("phone")),
    email: required(formData.get("email")).toLowerCase(),
    password: String(formData.get("password") ?? ""),
    gstNumber: required(formData.get("gstNumber")),
    location: required(formData.get("location")),
    services: required(formData.get("services")),
    machinery: required(formData.get("machinery")),
    capacity: required(formData.get("capacity")),
    workerCount: numberField(formData.get("workerCount")),
    experienceYears: numberField(formData.get("experienceYears")),
    logoUrl: undefined as string | undefined,
    factoryImages: [] as string[]
  };

  if (
    !input.companyName ||
    !input.ownerName ||
    !input.phone ||
    !input.email ||
    input.password.length < 8 ||
    !input.gstNumber ||
    !input.location ||
    !input.services ||
    !input.machinery ||
    !input.capacity ||
    Number.isNaN(input.workerCount) ||
    Number.isNaN(input.experienceYears)
  ) {
    return NextResponse.json({ error: "Missing required vendor fields" }, { status: 400 });
  }

  try {
    const logo = formData.get("logo");
    const factoryImages = formData.getAll("factoryImages").filter((file): file is File => file instanceof File);
    const logoUpload = logo instanceof File && logo.size > 0 ? await uploadFile(logo, uploadFolders.vendorLogos) : null;
    const factoryUploads = await uploadFiles(factoryImages, uploadFolders.vendorFactory);

    input.logoUrl = logoUpload?.secure_url;
    input.factoryImages = factoryUploads.map((upload) => upload.secure_url);

    const vendor = await createVendor(input);
    await setRoleCookie({
      id: vendor.id,
      role: "vendor",
      name: vendor.ownerName,
      email: vendor.email
    });

    return NextResponse.redirect(new URL("/vendor/dashboard", request.url), 303);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Registration failed" }, { status: 400 });
  }
}
