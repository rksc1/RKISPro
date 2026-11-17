"use client";

import { useState } from "react";
import {
  Download,
  FileCheck,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Upload
} from "lucide-react";
import type { ProjectMilestone } from "@/models/ProjectMilestone";

const standardQCGates = [
  "Raw Material Test Certificate (MTC) & Heat Number Checked",
  "Dimensional & Tolerance Inspection passed against CAD Drawing",
  "Visual Weld / Structural / Integrity Checks Cleared",
  "Surface Treatment / Paint Coating Thickness (DFT) Verified"
];

function isPdf(url: string) {
  return url.toLowerCase().includes(".pdf") || url.toLowerCase().includes("application/pdf");
}

export function CustomerMilestoneQCReview({
  projectId,
  milestone
}: {
  projectId: string;
  milestone: ProjectMilestone;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (milestone.status !== "in_review") return null;

  return (
    <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/[0.05] via-white to-slate-50 p-5 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-teal-200/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
            <ShieldCheck className="size-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Milestone Inspection & Escrow Clearance Gate
          </h4>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
          Awaiting Your Sign-Off
        </span>
      </div>

      <p className="mt-3 text-xs text-slate-600 leading-relaxed">
        The contractor has submitted this milestone for inspection sign-off. Please review the attached test certificates, dimensional reports, and shop-floor photos before approving escrow disbursement.
      </p>

      {/* QC Description / Checks logged */}
      {milestone.description && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-700">
          <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">
            Vendor QC Declaration & Notes:
          </span>
          <pre className="font-sans whitespace-pre-wrap leading-relaxed text-xs text-slate-800">
            {milestone.description}
          </pre>
        </div>
      )}

      {/* Attachments Preview */}
      {milestone.attachmentUrls && milestone.attachmentUrls.length > 0 && (
        <div className="mt-4">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Inspection Deliverables & Proof of Work ({milestone.attachmentUrls.length}):
          </span>
          <div className="grid gap-2 sm:grid-cols-2">
            {milestone.attachmentUrls.map((url, i) => {
              const pdf = isPdf(url);
              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 hover:border-teal-500 hover:shadow-2xs transition group"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${pdf ? "bg-red-50 text-red-600" : "bg-teal-50 text-teal-600"}`}>
                      {pdf ? <FileText className="size-4" /> : <ImageIcon className="size-4" />}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {pdf ? `Inspection Report ${i + 1}.pdf` : `Shop Photo ${i + 1}`}
                    </span>
                  </div>
                  <Download className="size-3.5 text-slate-400 group-hover:text-teal-600 shrink-0 ml-2" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Approval Form */}
      <form
        action={`/api/customer/projects/${projectId}/milestones/${milestone.id}/approve`}
        method="post"
        className="mt-5 border-t border-slate-200/80 pt-4"
        onSubmit={() => setSubmitting(true)}
      >
        <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="size-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 mt-0.5"
            required
          />
          <span className="leading-snug">
            I confirm that I (or my plant inspection engineer) have reviewed the milestone deliverables, dimensional compliance, and test certificates. I authorize the release of associated milestone escrow funds.
          </span>
        </label>

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={!confirmed || submitting}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-xs font-bold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShieldCheck className="size-4" />
            <span>{submitting ? "Signing Off & Releasing..." : "Approve Milestone & Authorize Release"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export function VendorMilestoneQCUpdate({
  projectId,
  milestone
}: {
  projectId: string;
  milestone: ProjectMilestone;
}) {
  const [status, setStatus] = useState<string>(milestone.status || "in_progress");
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const isReadyForApproval = status === "in_review";

  function toggleCheck(gate: string) {
    setSelectedChecks((prev) =>
      prev.includes(gate) ? prev.filter((item) => item !== gate) : [...prev, gate]
    );
  }

  return (
    <form
      action={`/api/vendor/projects/${projectId}/milestones/${milestone.id}`}
      method="post"
      encType="multipart/form-data"
      className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          Milestone Progress Status
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="min-h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
          >
            <option value="in_progress">In Progress (Active Work)</option>
            <option value="in_review">Ready for Customer Inspection & Approval</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </label>

        <label className="grid gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          Upload Quality / Test Proofs (MTC, Photos, Reports)
          <input
            type="file"
            name="attachments"
            multiple
            accept="image/*,application/pdf"
            className="min-h-10 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-normal text-slate-700 file:mr-2 file:rounded-md file:border-0 file:bg-teal-50 file:px-2 file:py-1 file:text-xs file:font-semibold file:text-teal-700"
          />
        </label>
      </div>

      {/* Industrial Quality Control Checklist (when setting to in_review) */}
      {isReadyForApproval && (
        <div className="rounded-xl border border-teal-500/30 bg-teal-50/50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
            <FileCheck className="size-4 text-teal-600" />
            Quality Control (QC) Sign-Off Checklist
          </div>
          <p className="text-xs text-teal-800 mb-3">
            Select the industrial quality checkpoints cleared during this stage:
          </p>
          <div className="grid gap-2">
            {standardQCGates.map((gate) => {
              const isChecked = selectedChecks.includes(gate);
              return (
                <label
                  key={gate}
                  className={`flex items-center gap-2.5 rounded-lg border p-2 text-xs font-semibold transition cursor-pointer ${
                    isChecked
                      ? "border-teal-600 bg-white text-teal-950 shadow-3xs"
                      : "border-teal-200/70 bg-white/60 text-slate-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="qcChecks"
                    value={gate}
                    checked={isChecked}
                    onChange={() => toggleCheck(gate)}
                    className="size-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{gate}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <label className="grid gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
        Technical Note / Progress Observations
        <input
          name="progressNote"
          placeholder="e.g. Fit-up inspection completed; root pass welding done with AWS E7018 electrodes."
          className="min-h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs font-normal text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        />
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-xs font-bold text-white shadow-2xs transition hover:bg-teal-700"
        >
          <Upload className="size-3.5" />
          <span>Update Milestone & Proofs</span>
        </button>
      </div>
    </form>
  );
}
