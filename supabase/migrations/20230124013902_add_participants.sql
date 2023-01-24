create table "public"."participants" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "first_name" character varying,
    "last_name" character varying,
    "major" character varying,
    "graduation_year" character varying,
    "resume" character varying,
    "portfolio_link" character varying
);


alter table "public"."participants" enable row level security;

CREATE UNIQUE INDEX participants_pkey ON public.participants USING btree (id);

alter table "public"."participants" add constraint "participants_pkey" PRIMARY KEY using index "participants_pkey";

alter table "public"."participants" add constraint "participants_id_fkey" FOREIGN KEY (id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."participants" validate constraint "participants_id_fkey";


