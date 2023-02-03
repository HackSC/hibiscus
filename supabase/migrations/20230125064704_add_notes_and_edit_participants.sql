create table "public"."notes" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "participant_id" uuid,
    "company_id" uuid,
    "note" text
);


alter table "public"."notes" enable row level security;

create table "public"."participants" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "dob" character varying,
    "school" character varying,
    "major" character varying,
    "graduation_year" character varying,
    "resume" uuid,
    "portfolio_link" character varying
);


alter table "public"."participants" enable row level security;

CREATE UNIQUE INDEX notes_pkey ON public.notes USING btree (id);

CREATE UNIQUE INDEX participants_pkey ON public.participants USING btree (id);

alter table "public"."notes" add constraint "notes_pkey" PRIMARY KEY using index "notes_pkey";

alter table "public"."participants" add constraint "participants_pkey" PRIMARY KEY using index "participants_pkey";


alter table "public"."notes" add constraint "notes_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES participants(id) not valid;

alter table "public"."notes" validate constraint "notes_participant_id_fkey";

alter table "public"."participants" add constraint "participants_id_fkey" FOREIGN KEY (id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."participants" validate constraint "participants_id_fkey";

alter table "public"."participants" add constraint "participants_resume_fkey" FOREIGN KEY (resume) REFERENCES storage.objects(id) not valid;

alter table "public"."participants" validate constraint "participants_resume_fkey";


