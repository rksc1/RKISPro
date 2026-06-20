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
  add column if not exists technical_requirements text,
  add column if not exists quantity text,
  add column if not exists quality_expectations text,
  add column if not exists budget_range text,
  add column if not exists inspection_requirement text,
  add column if not exists gst_requirement boolean not null default false;

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

alter table public.vendors
  add column if not exists vendor_type text not null default 'company',
  add column if not exists full_name text,
  add column if not exists skill_categories text[] not null default '{}',
  add column if not exists service_radius_km numeric,
  add column if not exists available_for_quick_booking boolean not null default true,
  add column if not exists id_proof_url text,
  add column if not exists profile_photo_url text,
  add column if not exists workshop_address text,
  add column if not exists workshop_images text[] not null default '{}',
  add column if not exists available_for_large_work boolean not null default true,
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists verification_status text not null default 'pending',
  add column if not exists verification_notes text,
  add column if not exists rating numeric not null default 0,
  add column if not exists completed_projects_count integer not null default 0,
  add column if not exists trust_score numeric not null default 0;

alter table public.vendors
  drop constraint if exists vendors_vendor_type_check,
  add constraint vendors_vendor_type_check check (vendor_type in ('individual', 'company'));

alter table public.vendors
  drop constraint if exists vendors_verification_status_check,
  add constraint vendors_verification_status_check check (verification_status in ('pending', 'verified', 'rejected'));

alter table public.vendors
  alter column company_name drop not null,
  alter column owner_name drop not null,
  alter column gst_number drop not null;

alter table public.vendors
  alter column services type text[] using case
    when services is null then '{}'
    when pg_typeof(services)::text = 'text[]' then services::text[]
    else string_to_array(services::text, ',')
  end,
  alter column services set default '{}',
  alter column machinery type text[] using case
    when machinery is null then '{}'
    when pg_typeof(machinery)::text = 'text[]' then machinery::text[]
    else string_to_array(machinery::text, ',')
  end,
  alter column machinery set default '{}';

update public.vendors
set
  city = coalesce(city, location),
  workshop_address = coalesce(workshop_address, location),
  workshop_images = case when workshop_images = '{}' then factory_images else workshop_images end,
  full_name = coalesce(full_name, owner_name),
  verification_status = case when status = 'Approved' then 'verified' when status = 'Rejected' then 'rejected' else verification_status end
where true;

create index if not exists vendors_vendor_type_idx on public.vendors (vendor_type);
create index if not exists vendors_verification_status_idx on public.vendors (verification_status);
create index if not exists vendors_city_idx on public.vendors (city);

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
  add column if not exists risk_notes text,
  add column if not exists is_recommended boolean not null default false,
  add column if not exists execution_fit_score numeric,
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
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'in_review', 'completed', 'delayed', 'cancelled')),
  attachment_urls text[] not null default '{}',
  due_date date,
  completed_at timestamptz,
  created_by_role text not null check (created_by_role in ('admin', 'vendor')),
  created_by_id uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.project_milestones
  add column if not exists attachment_urls text[] not null default '{}';

alter table public.project_milestones drop constraint if exists project_milestones_status_check;
alter table public.project_milestones add constraint project_milestones_status_check check (status in ('pending', 'in_progress', 'in_review', 'completed', 'delayed', 'cancelled'));


create index if not exists project_milestones_project_id_idx on public.project_milestones (project_id);
create index if not exists project_milestones_status_idx on public.project_milestones (status);
create index if not exists project_milestones_due_date_idx on public.project_milestones (due_date);

create table if not exists public.project_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_role text not null check (sender_role in ('customer', 'vendor', 'admin')),
  sender_id uuid not null,
  content text not null,
  attachment_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_messages_project_id_created_at_idx on public.project_messages (project_id, created_at);

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

create table if not exists public.quick_bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  service_type text not null check (service_type in ('welder', 'mechanic', 'repair', 'installer', 'maintenance', 'electrician', 'plumber', 'helper', 'welding_repair', 'fabrication_repair', 'machine_mechanic', 'cnc_machine_service', 'lathe_machine_service', 'electrical_repair', 'industrial_electrician', 'ac_repair', 'hvac_service', 'plumbing_repair', 'compressor_service', 'pump_motor_service', 'generator_service', 'panel_repair', 'installation_support', 'maintenance_visit', 'breakdown_support', 'inspection_visit', 'helper_manpower', 'other_site_service')),
  title text not null,
  description text,
  location text not null,
  preferred_date date,
  preferred_time text,
  urgency text not null default 'normal' check (urgency in ('normal', 'urgent', 'emergency')),
  budget numeric,
  images text[] not null default '{}',
  contact_name text,
  contact_phone text,
  site_access_notes text,
  machine_or_equipment text,
  issue_started_at text,
  safety_requirements text,
  status text not null default 'pending' check (status in ('pending', 'assigned', 'accepted', 'in_progress', 'completed', 'cancelled')),
  assigned_vendor_id uuid references public.vendors(id),
  assigned_worker_name text,
  assigned_worker_phone text,
  admin_notes text,
  vendor_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quick_bookings
  add column if not exists contact_name text,
  add column if not exists contact_phone text,
  add column if not exists site_access_notes text,
  add column if not exists machine_or_equipment text,
  add column if not exists issue_started_at text,
  add column if not exists safety_requirements text;

alter table public.quick_bookings
  drop constraint if exists quick_bookings_service_type_check,
  add constraint quick_bookings_service_type_check check (service_type in ('welder', 'mechanic', 'repair', 'installer', 'maintenance', 'electrician', 'plumber', 'helper', 'welding_repair', 'fabrication_repair', 'machine_mechanic', 'cnc_machine_service', 'lathe_machine_service', 'electrical_repair', 'industrial_electrician', 'ac_repair', 'hvac_service', 'plumbing_repair', 'compressor_service', 'pump_motor_service', 'generator_service', 'panel_repair', 'installation_support', 'maintenance_visit', 'breakdown_support', 'inspection_visit', 'helper_manpower', 'other_site_service'));

create index if not exists quick_bookings_customer_id_idx on public.quick_bookings (customer_id);
create index if not exists quick_bookings_status_idx on public.quick_bookings (status);
create index if not exists quick_bookings_service_type_idx on public.quick_bookings (service_type);
create index if not exists quick_bookings_assigned_vendor_id_idx on public.quick_bookings (assigned_vendor_id);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text not null check (role in ('customer', 'vendor', 'admin')),
  full_name text not null,
  company_name text,
  phone text,
  city text,
  state text,
  avatar_url text,
  is_verified boolean not null default false,
  is_approved boolean not null default false,
  status text not null default 'active'
    check (status in ('active', 'pending', 'approved', 'rejected', 'verified', 'suspended', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.customers
  add column if not exists profile_id uuid references public.profiles(id) on delete set null,
  add column if not exists company_type text,
  add column if not exists billing_address text,
  add column if not exists city text,
  add column if not exists state text;

alter table public.vendors
  add column if not exists profile_id uuid references public.profiles(id) on delete set null,
  add column if not exists pan_number text,
  add column if not exists agreement_accepted boolean not null default false,
  add column if not exists agreement_accepted_at timestamptz,
  add column if not exists verification_documents text[] not null default '{}',
  add column if not exists business_type text,
  add column if not exists is_suspended boolean not null default false;

alter table public.profiles
  add column if not exists email text;

alter table public.profiles
  drop constraint if exists profiles_role_check,
  add constraint profiles_role_check check (role in ('customer', 'vendor', 'admin'));

alter table public.profiles
  drop constraint if exists profiles_status_check,
  add constraint profiles_status_check check (status in ('active', 'pending', 'approved', 'rejected', 'verified', 'suspended', 'inactive'));

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_status_idx on public.profiles (status);
create index if not exists profiles_city_state_idx on public.profiles (city, state);
create unique index if not exists profiles_email_lower_idx on public.profiles (lower(email)) where email is not null;
create index if not exists customers_profile_id_idx on public.customers (profile_id);
create index if not exists vendors_profile_id_idx on public.vendors (profile_id);
create index if not exists vendors_agreement_accepted_idx on public.vendors (agreement_accepted);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text := coalesce(new.raw_user_meta_data ->> 'role', 'customer');
begin
  if requested_role not in ('customer', 'vendor', 'admin') then
    requested_role := 'customer';
  end if;

  insert into public.profiles (
    id,
    email,
    role,
    full_name,
    status,
    is_approved
  )
  values (
    new.id,
    lower(new.email),
    requested_role,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    case when requested_role = 'vendor' then 'pending' else 'active' end,
    requested_role <> 'vendor'
  )
  on conflict (id) do update
    set
      email = excluded.email,
      updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- Security: Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.vendors enable row level security;
alter table public.admins enable row level security;
alter table public.marketplace_requests enable row level security;
alter table public.vendor_notifications enable row level security;
alter table public.vendor_quotes enable row level security;
alter table public.projects enable row level security;

create policy "Service role bypass" on public.profiles for all using (true);
create policy "Service role bypass" on public.customers for all using (true);
create policy "Service role bypass" on public.vendors for all using (true);
create policy "Service role bypass" on public.admins for all using (true);
create policy "Service role bypass" on public.marketplace_requests for all using (true);
create policy "Service role bypass" on public.vendor_notifications for all using (true);
create policy "Service role bypass" on public.vendor_quotes for all using (true);
create policy "Service role bypass" on public.projects for all using (true);

create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Customers can view their own record" on public.customers for select using (auth.uid() = profile_id);
create policy "Vendors can view their own record" on public.vendors for select using (auth.uid() = profile_id);

create policy "Vendors can view their own notifications" on public.vendor_notifications for select using (
  vendor_id in (select id from public.vendors where profile_id = auth.uid())
);
create policy "Vendors can view their own quotes" on public.vendor_quotes for select using (
  vendor_id in (select id from public.vendors where profile_id = auth.uid())
);

create policy "Customers can view their own requests" on public.marketplace_requests for select using (
  customer_id in (select id from public.customers where profile_id = auth.uid())
);
create policy "Customers can view quotes for their requests" on public.vendor_quotes for select using (
  request_id in (select id from public.marketplace_requests where customer_id in (select id from public.customers where profile_id = auth.uid()))
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists reviews_vendor_id_idx on public.reviews (vendor_id);
create index if not exists reviews_customer_id_idx on public.reviews (customer_id);
create index if not exists reviews_rating_idx on public.reviews (rating);

alter table public.reviews enable row level security;
create policy "Service role bypass" on public.reviews for all using (true);

create policy "Anyone can read reviews" on public.reviews for select using (true);

create policy "Customers can write reviews for their own projects" on public.reviews for insert with check (
  customer_id in (select id from public.customers where profile_id = auth.uid())
);
