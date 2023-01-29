alter table "public"."participants" disable row level security;

alter table "public"."user_profiles" add column "attendance_confirmed" boolean;

alter table "public"."participants" drop constraint "participants_resume_fkey";

alter table "public"."participants" alter column "resume" set data type character varying using "resume"::character varying;