"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, MailCheck } from "lucide-react";
import { AuthField } from "@/components/ui/AuthField";
import { Logo } from "@/components/ui/Logo";

export function EmailConfirmationNotice({
  email = "",
  role,
  compact = false
}: {
  email?: string;
  role?: string;
  compact?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function resend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/auth/resend-confirmation", {
        method: "POST",
        body: new FormData(event.currentTarget)
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setError(payload?.error ?? "Could not resend confirmation email.");
        return;
      }

      setMessage(payload?.message ?? "Confirmation email sent again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`${compact ? "mt-5" : "w-full max-w-xl"} rounded-3xl border border-white/10 bg-white/[0.07] p-6 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8`}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4 }}
    >
      {!compact ? (
        <div className="mb-7 flex justify-center">
          <Logo variant="light" size="md" priority />
        </div>
      ) : null}
      <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-300/20">
        <MailCheck className="size-8" />
      </div>
      <h1 className="mt-6 text-3xl font-black text-white">Check your email to confirm your account</h1>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        We&apos;ve sent a confirmation link to your email address. Please verify your email before logging in to RKISPro.
      </p>
      {role === "vendor" ? (
        <p className="mt-3 rounded-2xl border border-teal-300/20 bg-teal-400/10 px-4 py-3 text-sm font-semibold text-teal-100">
          Your vendor profile will be reviewed after email verification.
        </p>
      ) : null}

      <form className="mt-6 grid gap-3 text-left" onSubmit={resend}>
        <AuthField defaultValue={email} label="Email" name="email" type="email" required />
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 text-sm font-bold text-white/80 transition hover:border-teal-300/40 hover:text-teal-300 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
          type="submit"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Resend confirmation email
        </button>
      </form>

      {message ? <p className="mt-4 text-sm font-semibold text-teal-200">{message}</p> : null}
      {error ? <p className="mt-4 text-sm font-semibold text-red-200">{error}</p> : null}

      <Link className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-teal-500 px-5 text-sm font-black text-white hover:bg-teal-400" href="/auth?mode=login">
        Go to Login
      </Link>
    </motion.div>
  );
}
