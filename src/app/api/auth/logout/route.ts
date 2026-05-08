import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, CUSTOMER_COOKIE, VENDOR_COOKIE } from "@/lib/session";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.delete(CUSTOMER_COOKIE);
  response.cookies.delete(VENDOR_COOKIE);
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
