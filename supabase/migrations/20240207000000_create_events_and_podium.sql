--EVENT SERVICE
create schema events;

create table
  events.events (
    event_id uuid not null default gen_random_uuid (),
    name character varying not null,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone not null,
    location character varying not null,
    description character varying null,
    bp_points bigint not null,
    capacity bigint null,
    organizer_details character varying null,
    constraint events_pkey primary key (event_id)
  ) tablespace pg_default;

create table
  events.contacts (
    contact_id uuid not null default gen_random_uuid (),
    event_id uuid not null,
    name character varying not null,
    role character varying null,
    phone character varying null,
    email character varying null,
    constraint contacts_pkey primary key (contact_id),
    constraint contacts_event_id_fkey foreign key (event_id) references events.events (event_id)
  ) tablespace pg_default;

create table
  events.event_tags (
    event_id uuid not null,
    event_tag character varying not null,
    constraint event_tags_pkey primary key (event_id, event_tag),
    constraint event_tags_event_id_fkey foreign key (event_id) references events.events (event_id)
  ) tablespace pg_default;

create table
  events.industry_tags (
    event_id uuid not null,
    industry_tag character varying not null,
    constraint industry_tags_pkey primary key (event_id, industry_tag),
    constraint industry_tags_event_id_fkey foreign key (event_id) references events.events (event_id)
  ) tablespace pg_default;

create table
  events.pinned_events (
    user_id uuid not null,
    event_id uuid not null,
    constraint pinned_events_pkey primary key (user_id, event_id),
    constraint pinned_events_event_id_fkey foreign key (event_id) references events.events (event_id)
  ) tablespace pg_default;


--PODIUM
create schema podium;

create table
  podium.verticals (
    vertical_id uuid not null default gen_random_uuid (),
    name character varying not null,
    description character varying null,
    constraint verticals_pkey primary key (vertical_id)
  ) tablespace pg_default;

create table
  podium.projects (
    project_id uuid not null default gen_random_uuid (),
    vertical_id uuid not null,
    name character varying not null,
    team character varying null,
    description character varying null,
    image_url character varying null,
    devpost_url character varying null,
    video_url character varying null,
    valid boolean not null default true,
    constraint projects_pkey primary key (project_id),
    constraint projects_vertical_id_fkey foreign key (vertical_id) references podium.verticals (vertical_id)
  ) tablespace pg_default;

create table
  podium.comments (
    project_id uuid not null,
    user_id character varying not null,
    comment character varying not null,
    created_at timestamp with time zone not null default now(),
    comment_id uuid not null default gen_random_uuid (),
    constraint comments_pkey primary key (comment_id),
    constraint comments_project_id_fkey foreign key (project_id) references podium.projects (project_id)
  ) tablespace pg_default;

create table
  podium.judges (
    user_id character varying not null,
    vertical_id uuid null,
    constraint judges_pkey primary key (user_id),
    constraint judges_vertical_id_fkey foreign key (vertical_id) references podium.verticals (vertical_id)
  ) tablespace pg_default;

create table
  podium.notes (
    project_id uuid not null,
    user_id character varying not null,
    notes character varying not null,
    constraint notes_pkey primary key (project_id, user_id),
    constraint notes_project_id_fkey foreign key (project_id) references podium.projects (project_id)
  ) tablespace pg_default;

create table
  podium.ranking_final (
    project_id uuid not null,
    rank bigint not null,
    constraint ranking_final_pkey primary key (project_id),
    constraint ranking_final_project_id_fkey foreign key (project_id) references podium.projects (project_id)
  ) tablespace pg_default;

create table
  podium.ranking_locks (
    vertical_id uuid not null,
    constraint ranking_locks_pkey primary key (vertical_id),
    constraint ranking_locks_vertical_id_fkey foreign key (vertical_id) references podium.verticals (vertical_id)
  ) tablespace pg_default;

create table
  podium.ranking (
    project_id uuid not null,
    user_id character varying not null,
    rank bigint not null,
    constraint ranking_pkey primary key (project_id, user_id),
    constraint ranking_project_id_fkey foreign key (project_id) references podium.projects (project_id)
  ) tablespace pg_default;

