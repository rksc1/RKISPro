"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function LeaveReviewForm({ projectId }: { projectId: string }) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/customer/projects/${projectId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit review");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <h3 className="text-lg font-black text-slate-950">Rate your experience</h3>
      <p className="mt-1 text-sm text-muted">Your feedback helps build trust in the RKISPro Marketplace.</p>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? "text-amber-500" : "text-slate-200"} hover:scale-110 transition-transform`}
            >
              ★
            </button>
          ))}
        </div>

        <label className="grid gap-2 text-sm font-semibold">
          Comment (Optional)
          <textarea
            className="min-h-24 rounded-md border border-line p-3"
            placeholder="Tell us what you liked about working with this vendor..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
          />
        </label>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
