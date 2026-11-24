"use client";

import React, { useState, useMemo } from "react";
import { CHECKPOINTS, CHECKPOINT_CATEGORIES, evaluateVendorAudit } from "@/lib/audit-checkpoints";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import type { CheckpointCategory, VendorAuditRecord, VerifiedBadge as BadgeType } from "@/types/audit";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, AlertTriangle, ShieldCheck, Award, Info, ChevronDown, ChevronUp } from "lucide-react";

interface VendorAuditFormProps {
  vendorId: string;
  vendorName: string;
  initialAudit?: VendorAuditRecord | null;
  currentBadge?: BadgeType;
  currentScore?: number;
  auditedAt?: string | null;
  auditorName?: string | null;
  adminName?: string;
}

export function VendorAuditForm({
  vendorId,
  vendorName,
  initialAudit,
  currentBadge = "none",
  currentScore = 0,
  auditedAt,
  auditorName: initialAuditorName,
  adminName = "RKISPro Quality Engineer"
}: VendorAuditFormProps) {
  // Initialize state with previous responses or zeros
  const [responses, setResponses] = useState<Record<string, number>>(() => {
    if (initialAudit?.checkpointResponses) {
      return { ...initialAudit.checkpointResponses };
    }
    // Default: all 0
    const defaults: Record<string, number> = {};
    for (const cp of CHECKPOINTS) {
      defaults[cp.id] = 0;
    }
    return defaults;
  });

  const [auditorName, setAuditorName] = useState(initialAuditorName || adminName);
  const [notes, setNotes] = useState(initialAudit?.notes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<CheckpointCategory>("bare_minimum");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Real-time badge and score calculation
  const evaluation = useMemo(() => {
    return evaluateVendorAudit(responses);
  }, [responses]);

  const setScore = (checkpointId: string, score: number) => {
    setResponses((prev) => ({
      ...prev,
      [checkpointId]: score
    }));
  };

  const setCategoryScores = (category: CheckpointCategory, score: number) => {
    const categoryCheckpoints = CHECKPOINTS.filter((c) => c.category === category);
    setResponses((prev) => {
      const next = { ...prev };
      for (const cp of categoryCheckpoints) {
        next[cp.id] = score;
      }
      return next;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditorName.trim()) {
      setMessage({ type: "error", text: "Please enter the Field Inspector / Auditor name." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/vendors/${vendorId}/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditorName: auditorName.trim(),
          responses,
          notes: notes.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save audit.");
      }

      setMessage({
        type: "success",
        text: `Audit successfully saved! Vendor awarded ${evaluation.badge.toUpperCase()} badge (${evaluation.totalScore}/80 pts).`
      });

      // Refresh page after 1.5 seconds to reflect state in parent layout
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Something went wrong saving the audit." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeCategoryObj = CHECKPOINT_CATEGORIES.find((c) => c.id === activeCategory);
  const activeCheckpoints = CHECKPOINTS.filter((c) => c.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header Summary & Real-time Evaluation Card */}
      <Card className="border-brand/20 bg-gradient-to-br from-white to-slate-50/50">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Current Live Status:</span>
              <VerifiedBadge badge={currentBadge} score={currentScore} size="md" />
            </div>
            <h3 className="text-xl font-black text-slate-950">On-Site Physical Workshop Audit Checklist</h3>
            <p className="text-sm text-slate-600 max-w-2xl">
              Inspect candidate facilities across the 15 Bare-Minimum and 25 Enterprise checkpoints. Badges are
              awarded automatically based on verified physical shop-floor observations.
            </p>
          </div>

          {/* Live Badge Preview Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm min-w-[280px]">
            <div className="text-xs font-bold uppercase text-slate-500">Live Projected Badge</div>
            <div className="mt-2 flex items-center gap-2">
              <VerifiedBadge badge={evaluation.badge} score={evaluation.totalScore} size="lg" />
            </div>

            {/* Score Progress Bars */}
            <div className="mt-4 space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Bare-Min Score (Need 20+ for Iron):</span>
                  <span>{evaluation.bareMinScore} / {evaluation.bareMinMax} pts</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full transition-all duration-300 ${
                      evaluation.bareMinScore >= 30 ? "bg-emerald-500" : evaluation.bareMinScore >= 20 ? "bg-orange-500" : "bg-red-400"
                    }`}
                    style={{ width: `${(evaluation.bareMinScore / evaluation.bareMinMax) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Enterprise Score:</span>
                  <span>{evaluation.enterpriseScore} / {evaluation.enterpriseMax} pts</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-sky-500 transition-all duration-300"
                    style={{ width: `${(evaluation.enterpriseScore / evaluation.enterpriseMax) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
                <span>Total Composite:</span>
                <span className="text-brand font-black">{evaluation.totalScore} / 80 pts</span>
              </div>
            </div>

            {/* Dynamic Guidance Banner */}
            <div className="mt-3 rounded-lg bg-slate-50 p-2 text-[11px] leading-relaxed text-slate-600">
              {evaluation.badge === "gold" ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 100% Cleared! Apex Gold Verified Enterprise Hub.
                </span>
              ) : evaluation.badge === "silver" ? (
                <span className="text-sky-800 font-medium">
                  🥈 Silver Earned! Clear all 40 checkpoints to unlock 🥇 Gold.
                </span>
              ) : evaluation.badge === "bronze" ? (
                <span className="text-orange-900 font-medium">
                  🥉 Bronze Earned! Clear Enterprise Cat 1 & Cat 2 to unlock 🥈 Silver.
                </span>
              ) : evaluation.badge === "iron" ? (
                <span className="text-slate-800 font-medium">
                  🛡️ Iron Earned! Reach 30/30 on Bare-Minimum to unlock 🥉 Bronze.
                </span>
              ) : (
                <span className="text-red-600 font-medium flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> Score at least 20 pts on Bare-Minimum to unlock 🛡️ Iron.
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Category Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {CHECKPOINT_CATEGORIES.map((cat) => {
          const catCheckpoints = CHECKPOINTS.filter((c) => c.category === cat.id);
          const currentCatScore = catCheckpoints.reduce((acc, c) => acc + (responses[c.id] || 0), 0);
          const maxCatScore = catCheckpoints.length * 2;
          const isComplete = currentCatScore === maxCatScore && maxCatScore > 0;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow"
                  : isComplete
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive ? "bg-white/20 text-white" : isComplete ? "bg-emerald-200 text-emerald-900" : "bg-slate-100 text-slate-600"
                }`}
              >
                {currentCatScore}/{maxCatScore}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Category Checkpoints */}
      {activeCategoryObj && (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                {activeCategoryObj.tier === "bare_minimum" ? "Core Gateway" : "Enterprise Standard"}
              </div>
              <h4 className="text-lg font-black text-slate-900">{activeCategoryObj.label}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{activeCategoryObj.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setCategoryScores(activeCategory, 2)}
                className="text-xs"
              >
                Mark Section All Pass (2 Pts)
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCategoryScores(activeCategory, 0)}
                className="text-xs text-slate-500"
              >
                Reset Section (0)
              </Button>
            </div>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {activeCheckpoints.map((cp) => {
              const currentScore = responses[cp.id] ?? 0;
              const isExpanded = !!expandedItems[cp.id];

              return (
                <div key={cp.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1 pr-4 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black text-slate-700">
                          {cp.number}
                        </span>
                        <h5 className="text-sm font-bold text-slate-950">{cp.title}</h5>
                      </div>
                      <p className="text-xs text-slate-600 pl-7">{cp.description}</p>

                      <div className="pl-7 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleExpand(cp.id)}
                          className="flex items-center gap-1 text-[11px] font-medium text-brand hover:underline"
                        >
                          <Info className="h-3 w-3" />
                          <span>{isExpanded ? "Hide Test Standard" : "View FQE Test Instruction & Pass Standard"}</span>
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-2 rounded-lg bg-slate-50 p-2.5 text-xs space-y-1.5 border border-slate-200">
                            <div>
                              <strong className="text-slate-800">Shop-Floor Test:</strong>{" "}
                              <span className="text-slate-600">{cp.testInstruction}</span>
                            </div>
                            <div>
                              <strong className="text-emerald-800">Pass Standard:</strong>{" "}
                              <span className="text-slate-600">{cp.passStandard}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 3-State Score Button Pill */}
                    <div className="flex items-center gap-1 self-start md:self-center shrink-0 pl-7 md:pl-0">
                      <button
                        type="button"
                        onClick={() => setScore(cp.id, 0)}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                          currentScore === 0
                            ? "bg-red-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        0 : Fail
                      </button>
                      <button
                        type="button"
                        onClick={() => setScore(cp.id, 1)}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                          currentScore === 1
                            ? "bg-amber-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        1 : Partial
                      </button>
                      <button
                        type="button"
                        onClick={() => setScore(cp.id, 2)}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                          currentScore === 2
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        2 : Full Pass
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Submission & Sign-off Form */}
      <form onSubmit={handleSubmit}>
        <Card className="border-slate-300">
          <h4 className="text-base font-black text-slate-950">Field Inspector Sign-off & Final Certification</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Record auditor details and shop-floor notes. Submitting will update the vendor record and award the verified badge.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Auditor / Quality Engineer Name *</label>
              <input
                type="text"
                required
                value={auditorName}
                onChange={(e) => setAuditorName(e.target.value)}
                placeholder="e.g. Rupesh Tiwari (Head of Operations)"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Audit Completion Date</label>
              <input
                type="text"
                disabled
                value={new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-bold text-slate-700">Physical Inspection Notes & Observations</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Inspected 3 VMCs and 4 MIG stations at Sirgitti Industrial Area. Machine spindle runout verified under 0.005mm. Clean shop-floor and active EOT crane. Recommended for Bronze / Silver qualification."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          {message && (
            <div
              className={`mt-4 rounded-lg p-3 text-sm font-semibold ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                  : "bg-red-50 text-red-900 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
            <div className="text-xs text-slate-500">
              Awarding: <strong className="uppercase text-slate-900">{evaluation.badge} Badge</strong> (Total Score: {evaluation.totalScore}/80)
            </div>

            <Button type="submit" disabled={isSubmitting} variant="primary" className="px-6">
              {isSubmitting ? "Saving & Certifying..." : `Save Audit & Issue ${evaluation.badge.toUpperCase()} Badge`}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
