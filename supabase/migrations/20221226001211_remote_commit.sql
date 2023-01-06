create table "public"."discord_invites" (
    "id" bigint generated by default as identity not null,
    "invite_used" boolean not null,
    "time_invite_used" timestamp with time zone,
    "user_profile_id" uuid,
    "invite_code" text
);


alter table "public"."discord_invites" enable row level security;

create table "public"."discord_profiles" (
    "id" bigint generated by default as identity not null,
    "discord_profile_id" text,
    "user_profile_id" uuid not null
);


alter table "public"."discord_profiles" enable row level security;

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

alter table "public"."roles" add column "discord_role_id" text;

alter table "public"."user_profiles" add column "team_id" uuid;

alter table "public"."user_profiles" add column "email" text not null;

CREATE UNIQUE INDEX discord_invites_pkey ON public.discord_invites USING btree (id);

CREATE UNIQUE INDEX discord_profiles_pkey ON public.discord_profiles USING btree (id);

CREATE UNIQUE INDEX invitations_pkey ON public.invitations USING btree (id);

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (team_id);

alter table "public"."discord_invites" add constraint "discord_invites_pkey" PRIMARY KEY using index "discord_invites_pkey";

alter table "public"."discord_profiles" add constraint "discord_profiles_pkey" PRIMARY KEY using index "discord_profiles_pkey";

alter table "public"."invitations" add constraint "invitations_pkey" PRIMARY KEY using index "invitations_pkey";

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."discord_invites" add constraint "discord_invites_user_profile_id_fkey" FOREIGN KEY (user_profile_id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."discord_invites" validate constraint "discord_invites_user_profile_id_fkey";

alter table "public"."discord_profiles" add constraint "discord_profiles_user_profile_id_fkey" FOREIGN KEY (user_profile_id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."discord_profiles" validate constraint "discord_profiles_user_profile_id_fkey";


