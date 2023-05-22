-- Final Ranking

CREATE TABLE IF NOT EXISTS public.ranking_final
(
    project_id integer NOT NULL,
    rank integer NOT NULL,
    CONSTRAINT ranking_final_pkey PRIMARY KEY (project_id),
    CONSTRAINT project_id FOREIGN KEY (project_id)
        REFERENCES public.projects (project_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ranking_final
    OWNER to postgres;

ALTER TABLE IF EXISTS public.ranking_final
    ENABLE ROW LEVEL SECURITY;

-- Ranking Locks

CREATE TABLE IF NOT EXISTS public.ranking_locks
(
    vertical_id integer NOT NULL,
    CONSTRAINT ranking_locks_pkey PRIMARY KEY (vertical_id),
    CONSTRAINT vertical_id FOREIGN KEY (vertical_id)
        REFERENCES public.verticals (vertical_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ranking_locks
    OWNER to postgres;

ALTER TABLE IF EXISTS public.ranking_locks
    ENABLE ROW LEVEL SECURITY;
