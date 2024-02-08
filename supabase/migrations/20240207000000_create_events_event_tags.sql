create table
  events.event_tags (
    event_id uuid not null,
    event_tag character varying not null,
    constraint event_tags_pkey primary key (event_id, event_tag),
    constraint event_tags_event_id_fkey foreign key (event_id) references events.events (event_id)
  ) tablespace pg_default;