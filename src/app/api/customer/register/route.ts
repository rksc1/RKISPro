import { NextResponse, type NextRequest } from "next/server";
import { createCustomer } from "@/services/customer-service";

function required(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const input = {
    name: required(formData.get("name")),
    phone: required(formData.get("phone")),
    email: required(formData.get("email")).toLowerCase(),
    password: String(formData.get("password") ?? ""),
    companyName: required(formData.get("companyName")),
    city: required(formData.get("city")),
    state: required(formData.get("state")),
    location: required(formData.get("location")) || `${required(formData.get("city"))}, ${required(formData.get("state"))}`,
    emailRedirectTo: `${origin}/auth/callback`
  };

  if (!input.name || !input.phone || !input.email || input.password.length < 8 || !input.city || !input.state) {
    return NextResponse.json({ error: "Missing required customer fields" }, { status: 400 });
  }

  try {
    await createCustomer(input);
    return NextResponse.redirect(new URL(`/auth/check-email?role=customer&email=${encodeURIComponent(input.email)}`, request.url), 303);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Registration failed" }, { status: 400 });
  }
}
