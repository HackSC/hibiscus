-- Verticals

CREATE TABLE IF NOT EXISTS public.verticals
(
    vertical_id serial,
    name character varying NOT NULL,
    description character varying,
    CONSTRAINT verticals_pkey PRIMARY KEY (vertical_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.verticals
    OWNER to postgres;

ALTER TABLE IF EXISTS public.verticals
    ENABLE ROW LEVEL SECURITY;

-- Projects

CREATE TABLE IF NOT EXISTS public.projects
(
    project_id serial,
    vertical_id integer NOT NULL,
    name character varying NOT NULL,
    team character varying,
    description character varying,
    image_url character varying,
    devpost_url character varying,
    PRIMARY KEY (project_id),
    CONSTRAINT vertical_id FOREIGN KEY (vertical_id)
        REFERENCES public.verticals (vertical_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.projects
    OWNER to postgres;

ALTER TABLE IF EXISTS public.projects
    ENABLE ROW LEVEL SECURITY;

-- Ranking

CREATE TABLE IF NOT EXISTS public.ranking
(
    project_id integer NOT NULL,
    user_id character varying NOT NULL,
    rank integer NOT NULL,
    CONSTRAINT ranking_pkey PRIMARY KEY (project_id, user_id),
    CONSTRAINT project_id FOREIGN KEY (project_id)
        REFERENCES public.projects (project_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ranking
    OWNER to postgres;

ALTER TABLE IF EXISTS public.ranking
    ENABLE ROW LEVEL SECURITY;

-- Notes

CREATE TABLE IF NOT EXISTS public.notes
(
    project_id integer NOT NULL,
    user_id character varying NOT NULL,
    notes character varying NOT NULL,
    PRIMARY KEY (project_id, user_id),
    CONSTRAINT project_id FOREIGN KEY (project_id)
        REFERENCES public.projects (project_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.notes
    OWNER to postgres;

ALTER TABLE IF EXISTS public.notes
    ENABLE ROW LEVEL SECURITY;

