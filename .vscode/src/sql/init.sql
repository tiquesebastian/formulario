-- Habilita función para generar UUID aleatorios.
create extension if not exists "pgcrypto";

-- Tabla principal de formularios EPS.
create table if not exists public.affiliation_forms (
  id uuid primary key default gen_random_uuid(),
  status text not null check (status in ('draft', 'submitted')) default 'draft',
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Función/trigger para refrescar updated_at en cada actualización.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_affiliation_forms_updated_at on public.affiliation_forms;
create trigger trg_affiliation_forms_updated_at
before update on public.affiliation_forms
for each row
execute procedure public.set_updated_at();

-- Seguridad: habilita RLS y permite acceso total solo al service role.
alter table public.affiliation_forms enable row level security;

create policy "service-role-full-access"
on public.affiliation_forms
as permissive
for all
to service_role
using (true)
with check (true);
