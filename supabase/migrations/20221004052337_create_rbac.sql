alter table "public"."employees" drop constraint "employees_pkey";

drop index if exists "public"."employees_pkey";

drop table "public"."employees";

create table "public"."roles" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "name" character varying not null
);


alter table "public"."roles" enable row level security;

create table "public"."user_profiles" (
    "created_at" timestamp with time zone default now(),
    "first_name" character varying not null,
    "last_name" character varying not null,
    "user_id" uuid not null,
    "role" bigint
);


alter table "public"."user_profiles" enable row level security;

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX user_profiles_pkey ON public.user_profiles USING btree (user_id);

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."user_profiles" add constraint "user_profiles_pkey" PRIMARY KEY using index "user_profiles_pkey";

alter table "public"."roles" add constraint "roles_name_key" UNIQUE using index "roles_name_key";

alter table "public"."user_profiles" add constraint "user_profiles_role_fkey" FOREIGN KEY (role) REFERENCES roles(id) not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_role_fkey";

create policy "only hacksc team members can see roles"
on "public"."roles"
as permissive
for select
to authenticated
using ((( SELECT user_profiles.role
   FROM user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 2));


