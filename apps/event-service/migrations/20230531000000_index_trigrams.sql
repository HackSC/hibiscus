CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX event_name_trgm_idx ON public.events USING GIST (name gist_trgm_ops);
