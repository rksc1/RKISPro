import { NextResponse, type NextRequest } from "next/server";
import { setRoleCookie } from "@/lib/auth";
import { authenticateAdmin } from "@/services/admin-service";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const admin = await authenticateAdmin(email, password);

  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setRoleCookie({
    id: admin.id,
    role: "admin",
    name: admin.name,
    email: admin.email
  });

  return NextResponse.redirect(new URL("/admin/dashboard", request.url), 303);
}
