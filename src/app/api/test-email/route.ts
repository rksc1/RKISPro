import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email/send-email";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const to = request.nextUrl.searchParams.get("to");
  if (!to) {
    return NextResponse.json({ error: "Missing ?to=email@example.com" }, { status: 400 });
  }

  try {
    const result = await sendEmail({
      to,
      subject: "RKISPro Email Setup Working",
      html: "<p>Your RKISPro Resend email integration is working.</p>"
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Email send failed" },
      { status: 500 }
    );
  }
}
