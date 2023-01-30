alter table "public"."participants" add column "wristband_id" character varying;

alter table "public"."user_profiles" drop column "wristband_id";

CREATE UNIQUE INDEX "participants_wristband_id_key" ON public.participants USING btree ("wristband_id");

alter table "public"."participants" add constraint "participants_wristband_id_key" UNIQUE using index "participants_wristband_id_key";


