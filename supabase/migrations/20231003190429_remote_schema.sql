drop policy "Enable delete for users based on user_id" on "public"."bonus_points_log";

drop policy "Enable read access for all users" on "public"."bonus_points_log";

drop policy "Enable read access for all users" on "public"."leaderboard";

drop policy "Enable read access for all users" on "public"."user_profiles";

alter table "public"."event_log" drop constraint "event_log_user_id_fkey";

alter table "public"."company_saved_participants" drop constraint "company_saved_participants_pkey";

drop index if exists "public"."company_saved_participants_pkey";

alter table "public"."pointr_shortlinks" enable row level security;

alter table "public"."user_profiles" alter column "role" set default '5'::bigint;

CREATE UNIQUE INDEX company_saved_participant_pkey ON public.company_saved_participants USING btree (id);

alter table "public"."company_saved_participants" add constraint "company_saved_participant_pkey" PRIMARY KEY using index "company_saved_participant_pkey";

alter table "public"."event_log" add constraint "event_log_user_id_fkey" FOREIGN KEY (user_id) REFERENCES participants(id) not valid;

alter table "public"."event_log" validate constraint "event_log_user_id_fkey";

create policy "Enable read for users based on user_id"
on "public"."bonus_points_log"
as permissive
for select
to anon, authenticated
using ((auth.uid() = user_id));


create policy "Enable read access for all users"
on "public"."notes"
as permissive
for select
to anon, authenticated
using (true);


create policy "Enable read access for all users"
on "public"."pointr_shortlinks"
as permissive
for select
to public
using (true);



