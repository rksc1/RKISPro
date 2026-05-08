import { NextResponse, type NextRequest } from "next/server";
import { setRoleCookie } from "@/lib/auth";
import { authenticateVendor } from "@/services/vendor-service";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const vendor = await authenticateVendor(email, password);

  if (!vendor) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setRoleCookie({
    id: vendor.id,
    role: "vendor",
    name: vendor.ownerName,
    email: vendor.email
  });

  return NextResponse.redirect(new URL("/vendor/dashboard", request.url), 303);
}
