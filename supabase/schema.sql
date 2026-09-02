-- =========================================================================
-- MY BEST FRIEND (MBF) — Supabase schema
-- Postgres + RLS. Rode este arquivo no SQL Editor do Supabase
-- (ou via `supabase db push` com a CLI).
-- =========================================================================

create extension if not exists "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. PERFIS (espelha auth.users) E FAMÍLIAS
-- -------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  xp integer not null default 0,           -- gamificação
  level integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Uma família agrupa vários usuários que cuidam dos mesmos pets
create table public.families (
  id uuid primary key default uuid_generate_v4(),
  name text not null default 'Minha família',
  invite_code text unique not null default substr(md5(random()::text), 1, 6),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.family_members (
  family_id uuid not null references public.families(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  joined_at timestamptz not null default now(),
  primary key (family_id, profile_id)
);

-- -------------------------------------------------------------------------
-- 2. PETS
-- -------------------------------------------------------------------------

create table public.pets (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid not null references public.families(id) on delete cascade,
  name text not null,
  species text not null default 'dog' check (species in ('dog', 'cat', 'other')),
  breed text,
  gender text check (gender in ('female', 'male')),
  birth_date date,                          -- idade calculada a partir daqui
  avatar_url text,
  weight_kg numeric(5,2),
  microchip_code text,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------------------
-- 3. SAÚDE — VACINAS
-- -------------------------------------------------------------------------

create table public.vaccines (
  id uuid primary key default uuid_generate_v4(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  name text not null,                       -- ex: "V10", "Antirrábica"
  applied_date date,
  next_due_date date,                       -- usado para lembretes
  dose_label text,                          -- "1ª dose", "reforço anual"
  vet_name text,
  cost numeric(10,2),
  notes text,
  reminder_sent boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
create index idx_vaccines_next_due on public.vaccines(next_due_date);

-- -------------------------------------------------------------------------
-- 4. SAÚDE — MEDICAMENTOS (tratamento contínuo, não só gasto)
-- -------------------------------------------------------------------------

create table public.medications (
  id uuid primary key default uuid_generate_v4(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  name text not null,
  dosage text,                              -- "1 comprimido", "5ml"
  frequency_hours integer,                  -- a cada X horas (null = uso único)
  start_date date not null default current_date,
  end_date date,                            -- null = uso contínuo
  cost numeric(10,2),
  active boolean not null default true,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- Cada dose efetivamente administrada (para acompanhamento, não só gasto)
create table public.medication_logs (
  id uuid primary key default uuid_generate_v4(),
  medication_id uuid not null references public.medications(id) on delete cascade,
  taken_at timestamptz not null default now(),
  taken_by uuid references public.profiles(id),
  skipped boolean not null default false,
  notes text
);

-- -------------------------------------------------------------------------
-- 5. BANHO — histórico + gasto
-- -------------------------------------------------------------------------

create table public.baths (
  id uuid primary key default uuid_generate_v4(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  bath_date date not null default current_date,
  location text check (location in ('home', 'petshop')),
  cost numeric(10,2),
  groomer_name text,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------------------
-- 6. RAÇÃO / ALIMENTAÇÃO — gastos + registro de refeições do dia a dia
-- -------------------------------------------------------------------------

create table public.food_purchases (
  id uuid primary key default uuid_generate_v4(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  brand text not null,
  package_kg numeric(6,2),
  cost numeric(10,2) not null,
  purchased_at date not null default current_date,
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.feeding_logs (
  id uuid primary key default uuid_generate_v4(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  fed_at timestamptz not null default now(),
  amount_grams numeric(6,1),
  fed_by uuid references public.profiles(id),
  notes text
);

-- -------------------------------------------------------------------------
-- 7. ATIVIDADES DA FAMÍLIA — passeios e outras interações do dia a dia
-- -------------------------------------------------------------------------

create table public.activities (
  id uuid primary key default uuid_generate_v4(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  type text not null check (type in ('walk', 'play', 'training', 'vet_visit', 'grooming', 'other')),
  logged_by uuid references public.profiles(id),
  started_at timestamptz not null default now(),
  duration_minutes integer,
  notes text,
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------------------
-- 8. MOMENTOS — fotos de passeios/viagens
-- -------------------------------------------------------------------------

create table public.moments (
  id uuid primary key default uuid_generate_v4(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  photo_url text not null,
  caption text,
  taken_at timestamptz not null default now(),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------------------
-- 9. GASTOS — visão unificada (view) para o dashboard mensal
--    Em vez de uma tabela solta, agregamos as tabelas de gasto reais
--    (ração, banho, vacina, remédio) para nunca ficar dessincronizado.
-- -------------------------------------------------------------------------

create view public.expenses_unified as
  select id, pet_id, 'food'::text as category, cost, purchased_at as spent_on, created_by from public.food_purchases where cost is not null
  union all
  select id, pet_id, 'bath'::text as category, cost, bath_date as spent_on, created_by from public.baths where cost is not null
  union all
  select id, pet_id, 'vaccine'::text as category, cost, applied_date as spent_on, created_by from public.vaccines where cost is not null
  union all
  select id, pet_id, 'medication'::text as category, cost, start_date as spent_on, created_by from public.medications where cost is not null;

-- -------------------------------------------------------------------------
-- 10. CONTEÚDO — dicas (cuidados, alimentação, enriquecimento ambiental)
-- -------------------------------------------------------------------------

create table public.tips (
  id uuid primary key default uuid_generate_v4(),
  category text not null check (category in ('care', 'feeding', 'enrichment')),
  species text default 'dog' check (species in ('dog', 'cat', 'other')),
  title text not null,
  body text not null,
  cover_url text,
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------------------
-- 11. GAMIFICAÇÃO — conquistas
-- -------------------------------------------------------------------------

create table public.achievements (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,               -- "first_walk", "7_day_streak"...
  title text not null,
  description text not null,
  icon text not null,                      -- nome do ícone (@expo/vector-icons)
  xp_reward integer not null default 10
);

create table public.profile_achievements (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key (profile_id, achievement_id)
);

-- =========================================================================
-- ROW LEVEL SECURITY
-- Regra geral: um usuário só acessa dados de pets cuja family_id ele integra.
-- =========================================================================

create or replace function public.is_family_member(_family_id uuid)
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.family_members
    where family_id = _family_id and profile_id = auth.uid()
  );
$$;

create or replace function public.pet_family_id(_pet_id uuid)
returns uuid language sql security definer stable as $$
  select family_id from public.pets where id = _pet_id;
$$;

alter table public.profiles enable row level security;
alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.pets enable row level security;
alter table public.vaccines enable row level security;
alter table public.medications enable row level security;
alter table public.medication_logs enable row level security;
alter table public.baths enable row level security;
alter table public.food_purchases enable row level security;
alter table public.feeding_logs enable row level security;
alter table public.activities enable row level security;
alter table public.moments enable row level security;
alter table public.tips enable row level security;
alter table public.achievements enable row level security;
alter table public.profile_achievements enable row level security;

create policy "profiles: read own + family" on public.profiles for select
  using (id = auth.uid() or id in (
    select fm2.profile_id from public.family_members fm1
    join public.family_members fm2 on fm2.family_id = fm1.family_id
    where fm1.profile_id = auth.uid()
  ));
create policy "profiles: update own" on public.profiles for update using (id = auth.uid());
create policy "profiles: insert own" on public.profiles for insert with check (id = auth.uid());

create policy "families: members can read" on public.families for select
  using (public.is_family_member(id));
create policy "families: creator can insert" on public.families for insert with check (created_by = auth.uid());
create policy "families: owner can update" on public.families for update using (public.is_family_member(id));

create policy "family_members: members can read" on public.family_members for select
  using (public.is_family_member(family_id));
create policy "family_members: members can join/add" on public.family_members for insert
  with check (profile_id = auth.uid() or public.is_family_member(family_id));
create policy "family_members: self or owner can remove" on public.family_members for delete
  using (profile_id = auth.uid() or public.is_family_member(family_id));

create policy "pets: family can read" on public.pets for select using (public.is_family_member(family_id));
create policy "pets: family can insert" on public.pets for insert with check (public.is_family_member(family_id));
create policy "pets: family can update" on public.pets for update using (public.is_family_member(family_id));
create policy "pets: family can delete" on public.pets for delete using (public.is_family_member(family_id));

-- Política genérica reaplicada para cada tabela filha de pets
do $$
declare
  t text;
begin
  foreach t in array array['vaccines','medications','baths','food_purchases','feeding_logs','activities','moments']
  loop
    execute format($f$
      create policy "%1$s: family can read" on public.%1$s for select
        using (public.is_family_member(public.pet_family_id(pet_id)));
      create policy "%1$s: family can insert" on public.%1$s for insert
        with check (public.is_family_member(public.pet_family_id(pet_id)));
      create policy "%1$s: family can update" on public.%1$s for update
        using (public.is_family_member(public.pet_family_id(pet_id)));
      create policy "%1$s: family can delete" on public.%1$s for delete
        using (public.is_family_member(public.pet_family_id(pet_id)));
    $f$, t);
  end loop;
end $$;

create policy "medication_logs: family can read" on public.medication_logs for select
  using (public.is_family_member(public.pet_family_id((select pet_id from public.medications m where m.id = medication_id))));
create policy "medication_logs: family can insert" on public.medication_logs for insert
  with check (public.is_family_member(public.pet_family_id((select pet_id from public.medications m where m.id = medication_id))));

create policy "tips: everyone can read" on public.tips for select using (true);
create policy "achievements: everyone can read" on public.achievements for select using (true);
create policy "profile_achievements: read own + family" on public.profile_achievements for select
  using (profile_id = auth.uid());
create policy "profile_achievements: insert own" on public.profile_achievements for insert
  with check (profile_id = auth.uid());

-- =========================================================================
-- TRIGGER: cria profile automaticamente ao registrar usuário no Supabase Auth
-- =========================================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Novo usuário'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
