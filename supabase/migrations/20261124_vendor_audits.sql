-- Migration: Add Verified Badge & Audit System
-- Date: 2026-11-24

ALTER TABLE vendors 
ADD COLUMN IF NOT EXISTS verified_badge TEXT DEFAULT 'none',
ADD COLUMN IF NOT EXISTS audit_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS bare_min_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS enterprise_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS audited_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS auditor_name TEXT,
ADD COLUMN IF NOT EXISTS audit_notes TEXT;

-- Table for detailed audit submissions
CREATE TABLE IF NOT EXISTS vendor_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  auditor_id UUID,
  auditor_name TEXT NOT NULL,
  audit_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  badge_awarded TEXT NOT NULL DEFAULT 'none',
  bare_min_score INTEGER NOT NULL DEFAULT 0,
  bare_min_max INTEGER NOT NULL DEFAULT 30,
  enterprise_score INTEGER NOT NULL DEFAULT 0,
  enterprise_max INTEGER NOT NULL DEFAULT 50,
  total_score INTEGER NOT NULL DEFAULT 0,
  total_max INTEGER NOT NULL DEFAULT 80,
  checkpoint_responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_vendor_audits_vendor_id ON vendor_audits(vendor_id);
