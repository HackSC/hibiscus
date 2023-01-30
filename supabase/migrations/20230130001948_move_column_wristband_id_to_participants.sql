alter table "public"."participants" add column "wristband_Id" character varying;

alter table "public"."user_profiles" drop column "wristband_id";

CREATE UNIQUE INDEX "participants_wristband_Id_key" ON public.participants USING btree ("wristband_Id");

alter table "public"."participants" add constraint "participants_wristband_Id_key" UNIQUE using index "participants_wristband_Id_key";


