create table
  podium.judges (
    user_id character varying not null,
    vertical_id uuid null,
    constraint judges_pkey primary key (user_id),
    constraint judges_vertical_id_fkey foreign key (vertical_id) references podium.verticals (vertical_id)
  ) tablespace pg_default;