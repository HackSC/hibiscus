-- Events

CREATE TABLE IF NOT EXISTS public.events
(
    event_id serial,
    name character varying NOT NULL,
    start_time timestamptz NOT NULL,
    end_time timestamptz NOT NULL,
    location character varying NOT NULL,
    description character varying,
    bp_points integer NOT NULL,
    capacity integer,
    organizer_details character varying,
    CONSTRAINT events_pkey PRIMARY KEY (event_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.events
    OWNER to postgres;

ALTER TABLE IF EXISTS public.events
    ENABLE ROW LEVEL SECURITY;

-- Event tags

CREATE TABLE IF NOT EXISTS public.event_tags
(
    event_id integer NOT NULL,
    event_tag character varying NOT NULL,
    CONSTRAINT event_tags_pkey PRIMARY KEY (event_id, event_tag),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.events (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.event_tags
    OWNER to postgres;

ALTER TABLE IF EXISTS public.event_tags
    ENABLE ROW LEVEL SECURITY;

-- Event industry tags

CREATE TABLE IF NOT EXISTS public.industry_tags
(
    event_id integer NOT NULL,
    industry_tag character varying NOT NULL,
    CONSTRAINT industry_tags_pkey PRIMARY KEY (event_id, industry_tag),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.events (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.industry_tags
    OWNER to postgres;

ALTER TABLE IF EXISTS public.industry_tags
    ENABLE ROW LEVEL SECURITY;

-- Event contact info

CREATE TABLE IF NOT EXISTS public.contacts
(
    contact_id serial,
    event_id integer NOT NULL,
    name character varying NOT NULL,
    role character varying,
    phone character varying,
    email character varying,
    CONSTRAINT contacts_pkey PRIMARY KEY (contact_id),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.events (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.contacts
    OWNER to postgres;

ALTER TABLE IF EXISTS public.contacts
    ENABLE ROW LEVEL SECURITY;

-- RSVP/Pinned events

CREATE TABLE IF NOT EXISTS public.pinned_events
(
    user_id uuid NOT NULL,
    event_id integer NOT NULL,
    CONSTRAINT pinned_events_pkey PRIMARY KEY (user_id, event_id),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.events (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pinned_events
    OWNER to postgres;

ALTER TABLE IF EXISTS public.pinned_events
    ENABLE ROW LEVEL SECURITY;
