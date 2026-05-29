"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

export function ManagedRFQForm({ children }: { children: ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/customer/requests", {
        body: new FormData(event.currentTarget),
        method: "POST"
      });

      if (response.redirected) {
        window.location.assign(response.url);
        return;
      }

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setError(payload?.error ?? "Could not submit this requirement. Please review the form and try again.");
        return;
      }

      window.location.assign("/customer/dashboard");
    } catch {
      setError("Network error while submitting this requirement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-6" encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {error}
        </div>
      ) : null}
      {children}
      <button
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-fit"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {isSubmitting ? "Submitting for review..." : "Submit Industrial Requirement"}
      </button>
    </form>
  );
}
