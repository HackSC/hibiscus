create table "public"."companies" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "name" character varying not null,
    "description" text,
    "website" character varying,
    "profile_photo" character varying
);


alter table "public"."companies" enable row level security;

create table "public"."target_graduations" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "company_id" uuid,
    "graduation_year" character varying
);


alter table "public"."target_graduations" enable row level security;

create table "public"."target_majors" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "company_id" uuid,
    "major" character varying
);


alter table "public"."target_majors" enable row level security;

CREATE UNIQUE INDEX companies_pkey ON public.companies USING btree (id);

CREATE UNIQUE INDEX target_graduations_pkey ON public.target_graduations USING btree (id);

CREATE UNIQUE INDEX target_majors_pkey ON public.target_majors USING btree (id);

alter table "public"."companies" add constraint "companies_pkey" PRIMARY KEY using index "companies_pkey";

alter table "public"."target_graduations" add constraint "target_graduations_pkey" PRIMARY KEY using index "target_graduations_pkey";

alter table "public"."target_majors" add constraint "target_majors_pkey" PRIMARY KEY using index "target_majors_pkey";

alter table "public"."target_graduations" add constraint "target_graduations_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) not valid;

alter table "public"."target_graduations" validate constraint "target_graduations_company_id_fkey";

alter table "public"."target_majors" add constraint "target_majors_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) not valid;

alter table "public"."target_majors" validate constraint "target_majors_company_id_fkey";


