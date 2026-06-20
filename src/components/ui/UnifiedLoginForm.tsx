"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, LogIn, ShieldCheck } from "lucide-react";
import { AuthField } from "@/components/ui/AuthField";
import { Logo } from "@/components/ui/Logo";

function friendlyLoginError(message?: string) {
  const normalizedMessage = String(message ?? "").toLowerCase();

  if (normalizedMessage.includes("invalid credentials")) {
    return "Email or password is incorrect. Please check the details and try again.";
  }
  if (normalizedMessage.includes("confirm your email")) {
    return "Please confirm your email before logging in.";
  }
  if (normalizedMessage.includes("vendor") && normalizedMessage.includes("pending")) {
    return "Your vendor account is still under RKISPro approval. You can log in after verification is complete.";
  }
  if (normalizedMessage.includes("profile") || normalizedMessage.includes("role account")) {
    return "Your account profile is incomplete. Please contact RKISPro support to finish setup.";
  }
  if (normalizedMessage.includes("not active") || normalizedMessage.includes("blocked") || normalizedMessage.includes("rejected")) {
    return "This account is not active. Please contact RKISPro support.";
  }

  return message ?? "Login failed. Please check your details and try again.";
}

export function UnifiedLoginForm({
  initialMessage,
  initialEmail = ""
}: {
  initialMessage?: string;
  initialEmail?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [needsConfirmation, setNeedsConfirmation] = useState(initialMessage === "confirm-email");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(
    initialMessage === "confirm-email"
      ? { type: "error", message: "Please confirm your email before logging in." }
      : null
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const response = await fetch("/api/auth/login", {
        body: JSON.stringify({ email, password: event.currentTarget.password.value }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setToast({ type: "error", message: friendlyLoginError(payload?.error) });
        setNeedsConfirmation(Boolean(payload?.needsConfirmation));
        return;
      }

      setToast({ type: "success", message: "Login successful. Redirecting..." });
      window.location.href = payload?.redirectTo ?? "/";
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid justify-items-center text-center">
        <Logo variant="light" size="md" priority />
        <div className="mt-7 grid size-12 place-items-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-300/20">
          <ShieldCheck className="size-6" />
        </div>
        <h1 className="mt-4 text-3xl font-black text-white">Login to RKISPro</h1>
      </div>

      {toast ? (
        <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${toast.type === "success" ? "border-teal-300/30 bg-teal-400/10 text-teal-100" : "border-red-300/30 bg-red-400/10 text-red-100"}`}>
          {toast.message}
        </div>
      ) : null}

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <AuthField
          autoComplete="email"
          label="Email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
          required
        />
        <AuthField
          autoComplete="current-password"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
        />
        <button
          className="inline-flex w-fit items-center gap-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-teal-300"
          onClick={() => setShowPassword((value) => !value)}
          type="button"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          {showPassword ? "Hide password" : "Show password"}
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-teal-500 px-5 text-sm font-black text-white shadow-lg shadow-teal-950/30 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
          type="submit"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
          Login
        </button>
      </form>

      {needsConfirmation ? (
        <form
          className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            const response = await fetch("/api/auth/resend-confirmation", { 
              method: "POST", 
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }) 
            });
            const payload = await response.json().catch(() => null);
            setToast(response.ok
              ? { type: "success", message: payload?.message ?? "Confirmation email sent again." }
              : { type: "error", message: payload?.error ?? "Could not resend confirmation email." });
            setLoading(false);
          }}
        >
          <p className="text-sm leading-6 text-slate-300">
            Did not receive the confirmation email? Enter the same email and resend it.
          </p>
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-teal-300/30 px-4 text-sm font-bold text-teal-200 hover:bg-teal-400/10"
            disabled={loading || !email}
            type="submit"
          >
            Resend confirmation email
          </button>
        </form>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
        <Link className="font-semibold text-teal-300 hover:text-teal-200" href="/auth/forgot-password">Forgot password?</Link>
        <p>
          New to RKISPro? <Link className="font-bold text-teal-300 hover:text-teal-200" href="/auth">Create account</Link>
        </p>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm leading-6 text-slate-300">
        Need help accessing your account?{" "}
        <Link className="font-bold text-teal-300 hover:text-teal-200" href="/contact">
          Contact RKISPro support
        </Link>
        .
      </div>
      <p className="mt-5 text-center text-xs leading-5 text-slate-400">
        By continuing, you agree to RKISPro Terms, Privacy Policy, Vendor Agreement, and Marketplace Policies.
      </p>
    </motion.div>
  );
}
