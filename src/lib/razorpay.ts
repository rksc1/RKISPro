import { createHmac, timingSafeEqual } from "node:crypto";
import type { Json } from "@/types/supabase";

function getKeyId() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) throw new Error("Missing RAZORPAY_KEY_ID environment variable");
  return keyId;
}

function getKeySecret() {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) throw new Error("Missing RAZORPAY_KEY_SECRET environment variable");
  return keySecret;
}

function safeCompare(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function createRazorpayOrder(
  amountInRupees: number,
  receiptId: string,
  notes: Record<string, string | number | boolean | null> = {}
) {
  const amount = Math.round(Number(amountInRupees) * 100);
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Invalid Razorpay amount");

  const auth = Buffer.from(`${getKeyId()}:${getKeySecret()}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: receiptId.slice(0, 40),
      notes
    })
  });

  const payload = (await response.json()) as Json;
  if (!response.ok || !payload || typeof payload !== "object" || Array.isArray(payload) || typeof payload.id !== "string") {
    throw new Error("Razorpay order creation failed");
  }

  return payload as Json & { id: string; amount: number; currency: string };
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  const digest = createHmac("sha256", getKeySecret())
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return safeCompare(digest, signature);
}

export function verifyRazorpayWebhookSignature(rawBody: string, signature: string) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error("Missing RAZORPAY_WEBHOOK_SECRET environment variable");

  const digest = createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
  return safeCompare(digest, signature);
}
