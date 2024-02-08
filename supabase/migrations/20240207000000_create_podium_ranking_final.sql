create table
  podium.ranking_final (
    project_id uuid not null,
    rank bigint not null,
    constraint ranking_final_pkey primary key (project_id),
    constraint ranking_final_project_id_fkey foreign key (project_id) references podium.projects (project_id)
  ) tablespace pg_default;