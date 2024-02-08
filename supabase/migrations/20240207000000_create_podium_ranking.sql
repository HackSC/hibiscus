create table
  podium.ranking (
    project_id uuid not null,
    user_id character varying not null,
    rank bigint not null,
    constraint ranking_pkey primary key (project_id, user_id),
    constraint ranking_project_id_fkey foreign key (project_id) references podium.projects (project_id)
  ) tablespace pg_default;