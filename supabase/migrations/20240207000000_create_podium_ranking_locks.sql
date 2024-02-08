create table
  podium.ranking_locks (
    vertical_id uuid not null,
    constraint ranking_locks_pkey primary key (vertical_id),
    constraint ranking_locks_vertical_id_fkey foreign key (vertical_id) references podium.verticals (vertical_id)
  ) tablespace pg_default;