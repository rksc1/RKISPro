import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  CUSTOMER_COOKIE,
  VENDOR_COOKIE,
  cookieByRole,
  signSession,
  verifySession
} from "@/lib/session";
import type { Role, SessionPayload } from "@/types/auth";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
};

export async function setRoleCookie(payload: SessionPayload) {
  const token = await signSession(payload);
  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_COOKIE);
  cookieStore.delete(VENDOR_COOKIE);
  cookieStore.delete(ADMIN_COOKIE);
  cookieStore.set(cookieByRole[payload.role], token, cookieOptions);
}

export async function clearRoleCookie(role: Role) {
  const cookieStore = await cookies();
  cookieStore.delete(cookieByRole[role]);
}

export async function getCustomerFromCookie() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(CUSTOMER_COOKIE)?.value);
  return session?.role === "customer" && session.emailConfirmedAt ? session : null;
}

export async function getVendorFromCookie() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(VENDOR_COOKIE)?.value);
  return session?.role === "vendor" && session.emailConfirmedAt ? session : null;
}

export async function getAdminFromCookie() {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  return session?.role === "admin" && session.emailConfirmedAt ? session : null;
}

export async function getCurrentSessionFromCookie() {
  const [customer, vendor, admin] = await Promise.all([
    getCustomerFromCookie(),
    getVendorFromCookie(),
    getAdminFromCookie()
  ]);

  return customer ?? vendor ?? admin;
}
