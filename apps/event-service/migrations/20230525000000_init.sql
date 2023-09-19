-- Events

CREATE TABLE IF NOT EXISTS public.events
(
    event_id UUID NOT NULL DEFAULT gen_random_uuid(),
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

-- Event tags

CREATE TABLE IF NOT EXISTS public.event_tags
(
    event_id UUID NOT NULL,
    event_tag character varying NOT NULL,
    CONSTRAINT event_tags_pkey PRIMARY KEY (event_id, event_tag),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.events (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

-- Event industry tags

CREATE TABLE IF NOT EXISTS public.industry_tags
(
    event_id UUID NOT NULL,
    industry_tag character varying NOT NULL,
    CONSTRAINT industry_tags_pkey PRIMARY KEY (event_id, industry_tag),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.events (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

-- Event contact info

CREATE TABLE IF NOT EXISTS public.contacts
(
    contact_id UUID NOT NULL DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL,
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

-- RSVP/Pinned events

CREATE TABLE IF NOT EXISTS public.pinned_events
(
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    CONSTRAINT pinned_events_pkey PRIMARY KEY (user_id, event_id),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.events (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
