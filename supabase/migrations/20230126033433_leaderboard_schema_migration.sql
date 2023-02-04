alter table "public"."bonus_points" add column "description" character varying;

alter table "public"."bonus_points" add column "link" character varying;

alter table "public"."leaderboard" add column "first_name" character varying not null;

alter table "public"."leaderboard" add column "last_name" character varying not null;


