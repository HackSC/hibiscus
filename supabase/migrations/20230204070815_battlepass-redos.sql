alter table "public"."bonus_points" add column "description" character varying;

alter table "public"."bonus_points" add column "link" character varying;

alter table "public"."company_saved_participants" drop constraint "company_saved_participants_company_id_fkey";

alter table "public"."company_saved_participants" drop constraint "company_saved_participants_user_id_fkey";

alter table "public"."event_log" drop constraint "event_log_user_id_fkey";

alter table "public"."leaderboard" drop constraint "leaderboard_user_id_fkey";

alter table "public"."company_saved_participants" drop constraint "company_saved_participants_pkey";

drop index if exists "public"."company_saved_participants_pkey";

drop table "public"."company_saved_participants";

alter table "public"."bonus_points" alter column "description" set data type text using "description"::text;

alter table "public"."bonus_points" alter column "id" set default uuid_generate_v4();

alter table "public"."bonus_points" alter column "link" set data type text using "link"::text;

alter table "public"."bonus_points_log" alter column "log_id" set default uuid_generate_v4();

alter table "public"."event_log" add constraint "event_log_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE not valid;

alter table "public"."event_log" validate constraint "event_log_user_id_fkey";

alter table "public"."leaderboard" add constraint "leaderboard_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."leaderboard" validate constraint "leaderboard_user_id_fkey";

create policy "Enable read access for all users"
on "public"."bonus_points"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."bonus_points_log"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."leaderboard"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."user_profiles"
as permissive
for select
to authenticated
using (true);


create policy "Enable delete for users based on user_id"
on "public"."bonus_points_log"
as permissive
for insert
to public
with check ((auth.uid() = user_id));