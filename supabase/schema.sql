create extension if not exists "pgcrypto";

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null unique,
  password text not null,
  company_name text not null,
  location text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  owner_name text not null,
  phone text not null,
  email text not null unique,
  password text not null,
  gst_number text not null,
  location text not null,
  services text not null,
  machinery text not null,
  capacity text not null,
  worker_count integer not null default 0 check (worker_count >= 0),
  experience_years integer not null default 0 check (experience_years >= 0),
  logo_url text,
  factory_images text[] not null default '{}',
  status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Rejected', 'Inactive')),
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.marketplace_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  project_title text not null,
  description text not null,
  service_type text not null,
  material_type text not null,
  location text not null,
  deadline date not null,
  drawing_urls text[] not null default '{}',
  status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Rejected', 'Distributed', 'awarded')),
  created_at timestamptz not null default now()
);

create table if not exists public.vendor_notifications (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  request_id uuid not null references public.marketplace_requests(id) on delete cascade,
  status text not null default 'Sent' check (status in ('Sent', 'Viewed', 'Quoted', 'awarded')),
  quote_amount numeric,
  quote_notes text,
  quote_file_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (vendor_id, request_id)
);

alter table public.vendor_notifications
  add column if not exists quote_amount numeric,
  add column if not exists quote_notes text,
  add column if not exists quote_file_urls text[] not null default '{}';

alter table public.marketplace_requests
  drop constraint if exists marketplace_requests_status_check;

alter table public.marketplace_requests
  add constraint marketplace_requests_status_check
  check (status in ('Pending', 'Approved', 'Rejected', 'Distributed', 'awarded'));

alter table public.vendor_notifications
  drop constraint if exists vendor_notifications_status_check;

alter table public.vendor_notifications
  add constraint vendor_notifications_status_check
  check (status in ('Sent', 'Viewed', 'Quoted', 'awarded'));

create index if not exists vendors_status_idx on public.vendors (status);
create index if not exists vendors_location_idx on public.vendors (location);
create index if not exists vendors_services_idx on public.vendors (services);
create index if not exists vendors_machinery_idx on public.vendors (machinery);
create index if not exists marketplace_requests_customer_id_idx on public.marketplace_requests (customer_id);
create index if not exists marketplace_requests_status_idx on public.marketplace_requests (status);
create index if not exists vendor_notifications_vendor_id_idx on public.vendor_notifications (vendor_id);
create index if not exists vendor_notifications_request_id_idx on public.vendor_notifications (request_id);

create table if not exists public.vendor_quotes (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  request_id uuid not null references public.marketplace_requests(id) on delete cascade,
  amount numeric not null check (amount > 0),
  timeline text not null,
  notes text not null,
  attachment_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'selected', 'not_selected')),
  admin_notes text,
  reviewed_at timestamptz,
  reviewed_by uuid references public.admins(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vendor_quotes
  add column if not exists status text not null default 'pending',
  add column if not exists admin_notes text,
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid references public.admins(id),
  add column if not exists updated_at timestamptz not null default now();

alter table public.vendor_quotes
  drop constraint if exists vendor_quotes_status_check;

alter table public.vendor_quotes
  add constraint vendor_quotes_status_check
  check (status in ('pending', 'approved', 'rejected', 'selected', 'not_selected'));

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.marketplace_requests(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  quote_id uuid not null references public.vendor_quotes(id) on delete cascade,
  status text not null default 'awarded' check (status in ('awarded', 'in_progress', 'on_hold', 'completed', 'cancelled')),
  start_date date,
  expected_delivery_date date,
  actual_delivery_date date,
  project_value numeric not null,
  commission_percentage numeric not null default 3,
  commission_amount numeric not null,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (request_id)
);

create index if not exists vendor_quotes_vendor_id_idx on public.vendor_quotes (vendor_id);
create index if not exists vendor_quotes_request_id_idx on public.vendor_quotes (request_id);
create index if not exists vendor_quotes_status_idx on public.vendor_quotes (status);
create index if not exists projects_customer_id_idx on public.projects (customer_id);
create index if not exists projects_vendor_id_idx on public.projects (vendor_id);
create index if not exists projects_request_id_idx on public.projects (request_id);
create index if not exists projects_status_idx on public.projects (status);

create table if not exists public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'delayed', 'cancelled')),
  due_date date,
  completed_at timestamptz,
  created_by_role text not null check (created_by_role in ('admin', 'vendor')),
  created_by_id uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_milestones_project_id_idx on public.project_milestones (project_id);
create index if not exists project_milestones_status_idx on public.project_milestones (status);
create index if not exists project_milestones_due_date_idx on public.project_milestones (due_date);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_role text not null check (user_role in ('customer', 'vendor', 'admin')),
  user_id uuid not null,
  title text not null,
  message text not null,
  type text not null default 'info' check (type in ('info', 'success', 'warning', 'error')),
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_role text not null check (actor_role in ('customer', 'vendor', 'admin')),
  actor_id uuid,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  description text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_role_user_id_idx on public.notifications (user_role, user_id);
create index if not exists notifications_is_read_idx on public.notifications (is_read);
create index if not exists notifications_created_at_idx on public.notifications (created_at);
create index if not exists activity_logs_entity_type_entity_id_idx on public.activity_logs (entity_type, entity_id);
create index if not exists activity_logs_created_at_idx on public.activity_logs (created_at);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  payment_type text not null check (payment_type in ('advance', 'milestone', 'final', 'refund', 'commission')),
  payment_direction text not null check (payment_direction in ('customer_to_platform', 'platform_to_vendor', 'customer_to_vendor')),
  amount numeric not null check (amount > 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  reference_number text,
  notes text,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  razorpay_status text,
  failure_reason text,
  gateway_response jsonb,
  created_by_role text not null check (created_by_role in ('admin', 'customer', 'vendor')),
  created_by_id uuid,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.payments
  add column if not exists razorpay_order_id text,
  add column if not exists razorpay_payment_id text,
  add column if not exists razorpay_signature text,
  add column if not exists razorpay_status text,
  add column if not exists failure_reason text,
  add column if not exists gateway_response jsonb;

create table if not exists public.project_financials (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete cascade,
  project_value numeric not null default 0,
  advance_received numeric not null default 0,
  total_received numeric not null default 0,
  vendor_paid numeric not null default 0,
  commission_percentage numeric not null default 3,
  commission_amount numeric not null default 0,
  pending_customer_balance numeric not null default 0,
  pending_vendor_payout numeric not null default 0,
  profit_amount numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_project_id_idx on public.payments (project_id);
create index if not exists payments_status_idx on public.payments (status);
create index if not exists payments_payment_type_idx on public.payments (payment_type);
create index if not exists payments_created_at_idx on public.payments (created_at);
create index if not exists payments_razorpay_order_id_idx on public.payments (razorpay_order_id);
create index if not exists payments_razorpay_payment_id_idx on public.payments (razorpay_payment_id);
create unique index if not exists payments_active_pending_razorpay_idx
  on public.payments (project_id, customer_id, payment_type)
  where payment_method = 'razorpay' and status = 'pending' and razorpay_order_id is not null;
