import { SignJWT, jwtVerify } from "jose";
import type { Role, SessionPayload } from "@/types/auth";

export const CUSTOMER_COOKIE = "rkispro_customer";
export const VENDOR_COOKIE = "rkispro_vendor";
export const ADMIN_COOKIE = "rkispro_admin";

export const cookieByRole: Record<Role, string> = {
  customer: CUSTOMER_COOKIE,
  vendor: VENDOR_COOKIE,
  admin: ADMIN_COOKIE
};

const encoder = new TextEncoder();

function secret() {
  if (!process.env.AUTH_SECRET) {
    throw new Error("Missing AUTH_SECRET environment variable");
  }

  return encoder.encode(process.env.AUTH_SECRET);
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(token?: string) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      id: String(payload.id),
      role: payload.role as Role,
      name: String(payload.name),
      email: String(payload.email)
    } satisfies SessionPayload;
  } catch {
    return null;
  }
}
