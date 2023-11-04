-- Final Ranking

CREATE TABLE IF NOT EXISTS public.ranking_final
(
    project_id UUID NOT NULL,
    rank integer NOT NULL,
    CONSTRAINT ranking_final_pkey PRIMARY KEY (project_id),
    CONSTRAINT project_id FOREIGN KEY (project_id)
        REFERENCES public.projects (project_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Ranking Locks

CREATE TABLE IF NOT EXISTS public.ranking_locks
(
    vertical_id UUID NOT NULL,
    CONSTRAINT ranking_locks_pkey PRIMARY KEY (vertical_id),
    CONSTRAINT vertical_id FOREIGN KEY (vertical_id)
        REFERENCES public.verticals (vertical_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
