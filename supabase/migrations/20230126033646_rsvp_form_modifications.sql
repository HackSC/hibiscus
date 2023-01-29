alter table "public"."user_profiles" add column "attendance_confirmed" boolean;

alter table "public"."participants" drop constraint "participants_resume_fkey";

alter table "public"."participants" alter column "resume" set data type character varying using "resume"::character varying;

create policy "Enable all for users on participants info based on user_id"
on "public"."participants"
as permissive
for all
to authenticated, anon
using ((auth.uid() = id))
with check ((auth.uid() = id));



create policy "Give users access to own folder 164ekr4_0"
on "storage"."objects"
as permissive
for insert
to authenticated, anon
with check (((bucket_id = 'rsvp-resume-hacker-2023'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 164ekr4_1"
on "storage"."objects"
as permissive
for update
to authenticated, anon
using (((bucket_id = 'rsvp-resume-hacker-2023'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 164ekr4_2"
on "storage"."objects"
as permissive
for select
to authenticated, anon
using (((bucket_id = 'rsvp-resume-hacker-2023'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 164ekr4_3"
on "storage"."objects"
as permissive
for delete
to authenticated, anon
using (((bucket_id = 'rsvp-resume-hacker-2023'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));