create table "public"."notes" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "participant_id" uuid,
    "company_id" uuid,
    "note" text
);


alter table "public"."notes" enable row level security;

CREATE UNIQUE INDEX notes_pkey ON public.notes USING btree (id);

alter table "public"."notes" add constraint "notes_pkey" PRIMARY KEY using index "notes_pkey";

alter table "public"."notes" add constraint "notes_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES participants(id) not valid;

alter table "public"."notes" validate constraint "notes_participant_id_fkey";


