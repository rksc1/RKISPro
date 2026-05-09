"use client";

import { useState } from "react";
import type { PaymentType } from "@/types/auth";
import type { Payment } from "@/models/Payment";

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
  customer,
  failedPayments = []
}: {
  projectId: string;
  pendingBalance: number;
  customer: { name?: string; email?: string };
  failedPayments?: Payment[];
}) {
  const [paymentType, setPaymentType] = useState<Extract<PaymentType, "advance" | "milestone" | "final"> | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [loading, setLoading] = useState(false);

  function choosePayment(type: Extract<PaymentType, "advance" | "milestone" | "final">, paymentAmount = "") {
    setPaymentType(type);
    setAmount(paymentAmount || (type === "final" ? String(pendingBalance) : ""));
    setMessage("");
    setMessageType("info");
  }

  async function startPayment() {
    if (!paymentType) return;
    setLoading(true);
    setMessage("");
    setMessageType("info");

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
          try {
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
            setMessage(verifyResult.idempotent ? "Payment already confirmed. Refreshing payment history..." : "Payment successful. Refreshing payment history...");
            setMessageType("success");
            window.setTimeout(() => window.location.reload(), 900);
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Payment verification failed");
            setMessageType("error");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setMessage("Payment window closed before completion.");
            setMessageType("info");
          }
        }
      });

      checkout.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Payment failed");
      setMessageType("error");
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
            onClick={() => choosePayment(type)}
            type="button"
          >
            {labels[type]}
          </button>
        ))}
      </div>

      {failedPayments.length > 0 ? (
        <div className="mt-4 rounded-md border border-red-100 bg-red-50 p-3">
          <p className="text-sm font-bold text-red-800">Failed payments available for retry</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {failedPayments.map((payment) => (
              <button
                className="rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 hover:border-red-400"
                key={payment.id}
                onClick={() => choosePayment(payment.paymentType as Extract<PaymentType, "advance" | "milestone" | "final">, String(payment.amount))}
                type="button"
              >
                Retry {payment.paymentType} - Rs. {Number(payment.amount).toLocaleString("en-IN")}
              </button>
            ))}
          </div>
        </div>
      ) : null}

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

      {message ? (
        <p
          className={`mt-3 rounded-md p-3 text-sm font-semibold ${
            messageType === "success"
              ? "bg-emerald-50 text-emerald-700"
              : messageType === "error"
                ? "bg-red-50 text-red-700"
                : "bg-canvas text-muted"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
