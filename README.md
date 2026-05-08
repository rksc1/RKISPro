# RKISPro Marketplace
Managed Industrial RFQ Marketplace Platform

One-line summary:
RKISPro is a B2B industrial fabrication marketplace connecting customers with verified fabrication vendors through a managed RFQ workflow.

Foundation for a B2B industrial RFQ marketplace built with Next.js App Router, Tailwind CSS, Supabase, Cloudinary, bcrypt, and protected cookie sessions.

## Architecture

- App routes live in `src/app`
- Reusable UI lives in `src/components`
- Shared integrations live in `src/lib`
- Supabase table/domain types live in `src/models`
- Business logic lives in `src/services`
- Route protection helpers live in `src/middleware`
- Shared types live in `src/types`
- Supabase SQL schema lives in `supabase/schema.sql`

## Current Scope

- Public routes: `/`, `/about`, `/services`, `/contact`
- Customer routes: `/customer/register`, `/customer/login`, `/customer/dashboard`
- Vendor routes: `/vendor/register`, `/vendor/login`, `/vendor/dashboard`
- Admin routes: `/admin/login`, `/admin/dashboard`, `/admin/vendors`, `/admin/requests`
- Separate customer, vendor, and admin cookies
- Customer and vendor registration
- Vendor logo and factory file uploads through Cloudinary
- Admin vendor approval, rejection, reactivation, and deactivation
- Admin vendor filters by location, services, and machinery
- Dashboard placeholders for future RFQ workflows

RFQ logic is intentionally not implemented yet.

## Setup

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` before running the app.

Run `supabase/schema.sql` in the Supabase SQL editor before using the app.

Admin users are expected to be inserted directly into the `admins` table. Store the admin `password` as a bcrypt hash.

To run SQL from your machine instead of the Supabase SQL editor, use either the Supabase CLI with a linked project or `psql` with the database connection string from Supabase.
