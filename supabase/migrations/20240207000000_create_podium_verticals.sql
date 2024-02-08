create table
  podium.verticals (
    vertical_id uuid not null default gen_random_uuid (),
    name character varying not null,
    description character varying null,
    constraint verticals_pkey primary key (vertical_id)
  ) tablespace pg_default;