import { getSupabase } from "@/lib/db";
import { evaluateVendorAudit } from "@/lib/audit-checkpoints";
import type { VendorAuditEvaluation, VendorAuditRecord, VerifiedBadge } from "@/types/audit";

export async function saveVendorAudit(params: {
  vendorId: string;
  auditorName: string;
  auditorId?: string | null;
  responses: Record<string, number>;
  notes?: string | null;
}): Promise<{ evaluation: VendorAuditEvaluation; audit: VendorAuditRecord }> {
  const { vendorId, auditorName, auditorId, responses, notes } = params;
  const evaluation = evaluateVendorAudit(responses);
  const now = new Date().toISOString();

  const supabase = getSupabase();

  // 1. Update the vendor row with the badge and score
  const updateData: Record<string, any> = {
    verified_badge: evaluation.badge,
    audit_score: evaluation.totalScore,
    bare_min_score: evaluation.bareMinScore,
    enterprise_score: evaluation.enterpriseScore,
    audited_at: now,
    auditor_name: auditorName,
    audit_notes: notes ?? null
  };

  // If vendor qualified for any verified badge (iron, bronze, silver, gold), mark verification_status as verified
  if (evaluation.badge !== "none") {
    updateData.verification_status = "verified";
    updateData.status = "Approved";
  }

  const { error: vendorUpdateError } = await (supabase.from("vendors") as any)
    .update(updateData)
    .eq("id", vendorId);

  if (vendorUpdateError) {
    console.error("Error updating vendor audit fields:", vendorUpdateError);
  }

  // 2. Insert detailed audit record into vendor_audits table
  let auditRecordId = `audit_${Date.now()}`;
  try {
    const { data: auditData, error: auditInsertError } = await (supabase.from("vendor_audits") as any)
      .insert({
        vendor_id: vendorId,
        auditor_id: auditorId ?? null,
        auditor_name: auditorName,
        audit_date: now,
        badge_awarded: evaluation.badge,
        bare_min_score: evaluation.bareMinScore,
        bare_min_max: evaluation.bareMinMax,
        enterprise_score: evaluation.enterpriseScore,
        enterprise_max: evaluation.enterpriseMax,
        total_score: evaluation.totalScore,
        total_max: evaluation.totalMax,
        checkpoint_responses: responses,
        notes: notes ?? null
      })
      .select("id")
      .single();

    if (auditInsertError) {
      console.warn("Could not insert into vendor_audits table (table may need migration):", auditInsertError.message);
    } else if (auditData?.id) {
      auditRecordId = auditData.id;
    }
  } catch (err) {
    console.warn("vendor_audits insert bypassed gracefully:", err);
  }

  const audit: VendorAuditRecord = {
    id: auditRecordId,
    vendorId,
    auditorId: auditorId ?? null,
    auditorName,
    auditDate: now,
    badgeAwarded: evaluation.badge,
    bareMinScore: evaluation.bareMinScore,
    bareMinMax: evaluation.bareMinMax,
    enterpriseScore: evaluation.enterpriseScore,
    enterpriseMax: evaluation.enterpriseMax,
    totalScore: evaluation.totalScore,
    totalMax: evaluation.totalMax,
    checkpointResponses: responses,
    notes: notes ?? null,
    createdAt: now
  };

  return { evaluation, audit };
}

export async function getLatestVendorAudit(vendorId: string): Promise<VendorAuditRecord | null> {
  const supabase = getSupabase();

  try {
    const { data, error } = await (supabase.from("vendor_audits") as any)
      .select("*")
      .eq("vendor_id", vendorId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      vendorId: data.vendor_id,
      auditorId: data.auditor_id,
      auditorName: data.auditor_name,
      auditDate: data.audit_date,
      badgeAwarded: data.badge_awarded as VerifiedBadge,
      bareMinScore: data.bare_min_score ?? 0,
      bareMinMax: data.bare_min_max ?? 30,
      enterpriseScore: data.enterprise_score ?? 0,
      enterpriseMax: data.enterprise_max ?? 50,
      totalScore: data.total_score ?? 0,
      totalMax: data.total_max ?? 80,
      checkpointResponses: data.checkpoint_responses ?? {},
      notes: data.notes,
      createdAt: data.created_at
    };
  } catch {
    return null;
  }
}
