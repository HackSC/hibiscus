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