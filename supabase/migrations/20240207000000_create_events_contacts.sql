create table
  events.contacts (
    contact_id uuid not null default gen_random_uuid (),
    event_id uuid not null,
    name character varying not null,
    role character varying null,
    phone character varying null,
    email character varying null,
    constraint contacts_pkey primary key (contact_id),
    constraint contacts_event_id_fkey foreign key (event_id) references events.events (event_id)
  ) tablespace pg_default;