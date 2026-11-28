create table if not exists public.bakery_photo_labels (
  filename text primary key check (filename ~ '^repo-(0[1-9]|[1-4][0-9]|5[0-2])\.jpg$'),
  label text,
  skip boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint bakery_photo_labels_label_or_skip
    check ((skip = true and label is null) or (skip = false and label is not null))
);

alter table public.bakery_photo_labels enable row level security;
revoke all on table public.bakery_photo_labels from anon, authenticated;
grant select, insert, update, delete on table public.bakery_photo_labels to service_role;
