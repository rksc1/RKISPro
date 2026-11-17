-- Add proforma_invoice_url column to the projects table
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS proforma_invoice_url text;
