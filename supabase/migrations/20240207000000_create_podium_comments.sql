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