import { NextResponse, type NextRequest } from "next/server";
import { createCustomer } from "@/services/customer-service";

function required(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const input = {
    name: String(body.name ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    email: String(body.email ?? "").trim().toLowerCase(),
    password: String(body.password ?? ""),
    companyName: String(body.companyName ?? "").trim(),
    city: String(body.city ?? "").trim(),
    state: String(body.state ?? "").trim(),
    location: String(body.location ?? "").trim() || `${String(body.city ?? "").trim()}, ${String(body.state ?? "").trim()}`,
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
