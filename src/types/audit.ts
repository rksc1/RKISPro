export type VerifiedBadge = "none" | "iron" | "bronze" | "silver" | "gold";

export type CheckpointCategory =
  | "bare_minimum"
  | "ent_raw_material"
  | "ent_welding"
  | "ent_ndt"
  | "ent_machining"
  | "ent_coating"
  | "ent_governance";

export interface CheckpointItem {
  id: string;
  number: number;
  title: string;
  category: CheckpointCategory;
  categoryLabel: string;
  tier: "bare_minimum" | "enterprise";
  description: string;
  testInstruction: string;
  passStandard: string;
  maxScore: 2;
}

export interface VendorAuditEvaluation {
  badge: VerifiedBadge;
  totalScore: number;
  totalMax: number;
  bareMinScore: number;
  bareMinMax: number;
  enterpriseScore: number;
  enterpriseMax: number;
  isBareMinPassed: boolean;
  isBareMinFull: boolean;
  isEntCat1And2Full: boolean;
  isAllCleared: boolean;
  categoryScores: Record<CheckpointCategory, { score: number; max: number }>;
}

export interface VendorAuditRecord {
  id: string;
  vendorId: string;
  auditorId?: string | null;
  auditorName: string;
  auditDate: string;
  badgeAwarded: VerifiedBadge;
  bareMinScore: number;
  bareMinMax: number;
  enterpriseScore: number;
  enterpriseMax: number;
  totalScore: number;
  totalMax: number;
  checkpointResponses: Record<string, number>;
  notes?: string | null;
  createdAt: string;
}
