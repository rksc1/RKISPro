"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function VendorPayoutForm({
  projectId,
  vendorId,
  pendingPayout
}: {
  projectId: string;
  vendorId: string;
  pendingPayout: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  if (pendingPayout <= 0) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reference) {
      setError("Please provide a bank reference number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/projects/${projectId}/payout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId, amount: pendingPayout, referenceNumber: reference })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to record payout.");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  }

  return (
    <form className="grid gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-soft" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-lg font-black text-emerald-950">Record Vendor Payout</h3>
        <p className="mt-1 text-sm text-emerald-800">
          The vendor is owed <strong>₹{pendingPayout.toLocaleString()}</strong> for this project.
          Only use this form AFTER you have successfully wired the funds to the vendor&apos;s bank account.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Input
            label="Bank Reference Number (UTR / IMPS)"
            name="referenceNumber"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="e.g. UTR1234567890"
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          {loading ? "Recording..." : "Mark as Paid"}
        </Button>
      </div>
    </form>
  );
}
