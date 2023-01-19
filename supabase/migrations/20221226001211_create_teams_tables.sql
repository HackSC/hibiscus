create table "public"."invitations" (
    "id" uuid unique not null,
    "created_at" timestamp with time zone default now(),
    "organizer_id" uuid not null,
    "invited_id" uuid not null,
    "team_id" uuid not null
);

alter table "public"."invitations" enable row level security;

create table "public"."teams" (
    "team_id" uuid unique,
    "created_at" timestamp with time zone default now(),
    "name" character varying not null,
    "description" text default ''::text,
    "photo_key" character varying,
    "organizer_id" uuid unique not null
);

alter table "public"."teams" enable row level security;

alter table "public"."user_profiles" add column "team_id" uuid;

CREATE UNIQUE INDEX invitations_pkey ON public.invitations USING btree (id);

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (team_id);

alter table "public"."invitations" add constraint "invitations_pkey" PRIMARY KEY using index "invitations_pkey";

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";