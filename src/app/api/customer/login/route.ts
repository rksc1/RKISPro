import { NextResponse, type NextRequest } from "next/server";
import { setRoleCookie } from "@/lib/auth";
import { authenticateCustomer } from "@/services/customer-service";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const customer = await authenticateCustomer(email, password);

  if (!customer) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setRoleCookie({
    id: customer.id,
    role: "customer",
    name: customer.name,
    email: customer.email
  });

  return NextResponse.redirect(new URL("/customer/dashboard", request.url), 303);
}
