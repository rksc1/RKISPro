"use client";

import { useState } from "react";
import type { PaymentType } from "@/types/auth";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const labels: Record<Extract<PaymentType, "advance" | "milestone" | "final">, string> = {
  advance: "Pay Advance",
  milestone: "Pay Milestone",
  final: "Pay Final Balance"
};

export function RazorpayPaymentActions({
  projectId,
  pendingBalance,
  customer
}: {
  projectId: string;
  pendingBalance: number;
  customer: { name?: string; email?: string };
}) {
  const [paymentType, setPaymentType] = useState<Extract<PaymentType, "advance" | "milestone" | "final"> | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function startPayment() {
    if (!paymentType) return;
    setLoading(true);
    setMessage("");

    try {
      const scriptReady = await loadRazorpayScript();
      if (!scriptReady || !window.Razorpay) throw new Error("Unable to load Razorpay Checkout");

      const response = await fetch("/api/customer/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          payment_type: paymentType,
          amount: Number(amount)
        })
      });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error ?? "Unable to create payment order");

      const checkout = new window.Razorpay({
        key: order.key_id,
        amount: Math.round(Number(order.amount) * 100),
        currency: order.currency,
        name: "RKISPro",
        description: "Project payment",
        order_id: order.order_id,
        prefill: {
          name: customer.name ?? order.customer?.name,
          email: customer.email ?? order.customer?.email
        },
        theme: { color: "#f59e0b" },
        handler: async (result: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch("/api/customer/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              payment_id: order.payment_id,
              razorpay_order_id: result.razorpay_order_id,
              razorpay_payment_id: result.razorpay_payment_id,
              razorpay_signature: result.razorpay_signature
            })
          });
          const verifyResult = await verify.json();
          if (!verify.ok) throw new Error(verifyResult.error ?? "Payment verification failed");
          setMessage("Payment successful. Refreshing payment history...");
          window.location.reload();
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setMessage("Payment window closed before completion.");
          }
        }
      });

      checkout.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Payment failed");
      setLoading(false);
    }
  }

  if (pendingBalance <= 0) return null;

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <h3 className="text-lg font-black text-slate-950">Pay online</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(labels) as Array<Extract<PaymentType, "advance" | "milestone" | "final">>).map((type) => (
          <button
            className={`rounded-md border px-4 py-2 text-sm font-bold ${paymentType === type ? "border-brand bg-brand text-white" : "border-line bg-white text-brand-dark"}`}
            key={type}
            onClick={() => {
              setPaymentType(type);
              setAmount(type === "final" ? String(pendingBalance) : "");
              setMessage("");
            }}
            type="button"
          >
            {labels[type]}
          </button>
        ))}
      </div>

      {paymentType ? (
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="grid gap-2 text-sm font-semibold">
            Amount
            <input
              className="min-h-11 rounded-md border border-line px-3"
              max={pendingBalance}
              min="1"
              onChange={(event) => setAmount(event.target.value)}
              placeholder={`Max Rs. ${pendingBalance.toLocaleString("en-IN")}`}
              type="number"
              value={amount}
            />
          </label>
          <div className="flex items-end">
            <button
              className="min-h-11 rounded-md bg-brand px-4 text-sm font-bold text-white disabled:opacity-60"
              disabled={loading || !amount || Number(amount) <= 0 || Number(amount) > pendingBalance}
              onClick={startPayment}
              type="button"
            >
              {loading ? "Processing..." : "Open Checkout"}
            </button>
          </div>
        </div>
      ) : null}

      {message ? <p className="mt-3 rounded-md bg-canvas p-3 text-sm font-semibold text-muted">{message}</p> : null}
    </div>
  );
}
