create table
  events.pinned_events (
    user_id uuid not null,
    event_id uuid not null,
    constraint pinned_events_pkey primary key (user_id, event_id),
    constraint pinned_events_event_id_fkey foreign key (event_id) references events.events (event_id)
  ) tablespace pg_default;