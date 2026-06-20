"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

type AuthFormCardProps = {
  title: string;
  subtitle: string;
  action: string;
  submitLabel: string;
  switchLabel: string;
  switchHref: string;
  switchText: string;
  roleHref: string;
  children: ReactNode;
};

export function AuthFormCard({
  title,
  subtitle,
  action,
  submitLabel,
  switchLabel,
  switchHref,
  switchText,
  roleHref,
  children
}: AuthFormCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setToast(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (showPassword) formData.set("showPassword", "true");

    try {
      const formProps = Object.fromEntries(formData.entries());
      const response = await fetch(action, {
        method: "POST",
        body: JSON.stringify(formProps),
        headers: { "Content-Type": "application/json" },
        redirect: "manual"
      });

      if (response.type === "opaqueredirect" || response.status === 0) {
        window.location.href = action.includes("register") ? switchHref : "/";
        return;
      }

      const location = response.headers.get("location");
      if (response.status >= 300 && response.status < 400 && location) {
        setToast({ type: "success", message: "Success. Redirecting..." });
        window.location.href = location;
        return;
      }

      if (response.ok) {
        setToast({ type: "success", message: "Success. Redirecting..." });
        window.location.href = location ?? "/";
        return;
      }

      const payload = await response.json().catch(() => null);
      setToast({ type: "error", message: payload?.error ?? "Something went wrong. Please try again." });
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
      <Link className="text-sm font-semibold text-teal-300 hover:text-teal-200" href={roleHref}>
        Back to role selection
      </Link>
      <div className="mt-5 flex items-start gap-3">
        <div className="grid size-11 place-items-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-300/20">
          <ShieldCheck className="size-5" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p>
        </div>
      </div>

      {toast ? (
        <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${toast.type === "success" ? "border-teal-300/30 bg-teal-400/10 text-teal-100" : "border-red-300/30 bg-red-400/10 text-red-100"}`}>
          {toast.message}
        </div>
      ) : null}

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        {children}
        <PasswordVisibilityField showPassword={showPassword} setShowPassword={setShowPassword} />
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-teal-500 px-5 text-sm font-black text-white shadow-lg shadow-teal-950/30 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
          type="submit"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {submitLabel}
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
        <Link className="font-semibold text-teal-300 hover:text-teal-200" href="/auth/forgot-password">Forgot password?</Link>
        <p>
          {switchText} <Link className="font-bold text-teal-300 hover:text-teal-200" href={switchHref}>{switchLabel}</Link>
        </p>
      </div>
    </motion.div>
  );
}

function PasswordVisibilityField({
  showPassword,
  setShowPassword
}: {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) {
  return (
    <button
      className="inline-flex w-fit items-center gap-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-teal-300"
      onClick={() => {
        setShowPassword(!showPassword);
        document.querySelectorAll<HTMLInputElement>('input[type="password"], input[data-password-field="true"]').forEach((input) => {
          input.type = showPassword ? "password" : "text";
          input.dataset.passwordField = "true";
        });
      }}
      type="button"
    >
      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      {showPassword ? "Hide password" : "Show password"}
    </button>
  );
}
