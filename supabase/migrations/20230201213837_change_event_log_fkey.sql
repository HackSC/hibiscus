alter table "public"."event_log" drop constraint "event_log_user_id_fkey";

alter table "public"."event_log" add constraint "event_log_user_id_fkey" FOREIGN KEY (user_id) REFERENCES participants(id) not valid;

alter table "public"."event_log" validate constraint "event_log_user_id_fkey";


