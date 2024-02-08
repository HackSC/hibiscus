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