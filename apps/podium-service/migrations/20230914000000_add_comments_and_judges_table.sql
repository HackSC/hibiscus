-- Comments

CREATE TABLE IF NOT EXISTS public.comments
(
    project_id UUID NOT NULL,
    user_id character varying NOT NULL,
    comment character varying NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), 
    PRIMARY KEY (project_id, user_id),
    CONSTRAINT project_id FOREIGN KEY (project_id)
        REFERENCES public.projects (project_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

-- Judges

CREATE TABLE IF NOT EXISTS public.judges
(
    user_id character varying NOT NULL,
    vertical_id UUID,
    PRIMARY KEY (user_id)
);