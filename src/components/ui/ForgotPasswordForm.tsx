"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { AuthField } from "@/components/ui/AuthField";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const response = await fetch("/api/auth/forgot-password", {
      body: new FormData(event.currentTarget),
      method: "POST"
    });
    const payload = await response.json().catch(() => null);

    if (response.ok) {
      setMessage(payload?.message ?? "Password reset email sent.");
    } else {
      setError(payload?.error ?? "Unable to send reset email.");
    }

    setLoading(false);
  }

  return (
    <form className="mt-6 grid gap-4 text-left" onSubmit={submit}>
      <AuthField label="Email" name="email" type="email" required />
      {message ? <p className="rounded-2xl border border-teal-300/30 bg-teal-400/10 px-4 py-3 text-sm font-semibold text-teal-100">{message}</p> : null}
      {error ? <p className="rounded-2xl border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">{error}</p> : null}
      <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-teal-500 px-5 text-sm font-black text-white hover:bg-teal-400 disabled:opacity-70" disabled={loading} type="submit">
        {loading ? <Loader2 className="size-4 animate-spin" /> : null}
        Send reset email
      </button>
    </form>
  );
}
