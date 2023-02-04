create table "public"."sponsor_user_bridge_company" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "user_id" uuid not null,
    "company_id" uuid not null
);


alter table "public"."sponsor_user_bridge_company" enable row level security;

CREATE UNIQUE INDEX sponsor_user_bridge_company_pkey ON public.sponsor_user_bridge_company USING btree (id);

CREATE UNIQUE INDEX sponsor_user_bridge_company_user_id_key ON public.sponsor_user_bridge_company USING btree (user_id);

alter table "public"."sponsor_user_bridge_company" add constraint "sponsor_user_bridge_company_pkey" PRIMARY KEY using index "sponsor_user_bridge_company_pkey";

alter table "public"."sponsor_user_bridge_company" add constraint "sponsor_user_bridge_company_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) not valid;

alter table "public"."sponsor_user_bridge_company" validate constraint "sponsor_user_bridge_company_company_id_fkey";

alter table "public"."sponsor_user_bridge_company" add constraint "sponsor_user_bridge_company_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."sponsor_user_bridge_company" validate constraint "sponsor_user_bridge_company_user_id_fkey";

alter table "public"."sponsor_user_bridge_company" add constraint "sponsor_user_bridge_company_user_id_key" UNIQUE using index "sponsor_user_bridge_company_user_id_key";


