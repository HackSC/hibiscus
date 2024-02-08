create table
  events.industry_tags (
    event_id uuid not null,
    industry_tag character varying not null,
    constraint industry_tags_pkey primary key (event_id, industry_tag),
    constraint industry_tags_event_id_fkey foreign key (event_id) references events.events (event_id)
  ) tablespace pg_default;