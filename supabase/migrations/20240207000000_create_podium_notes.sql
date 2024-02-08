create table
  podium.notes (
    project_id uuid not null,
    user_id character varying not null,
    notes character varying not null,
    constraint notes_pkey primary key (project_id, user_id),
    constraint notes_project_id_fkey foreign key (project_id) references podium.projects (project_id)
  ) tablespace pg_default;