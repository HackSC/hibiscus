-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.leaderboard
(
    user_id uuid NOT NULL,
    bonus_points integer NOT NULL DEFAULT 0,
    event_points integer NOT NULL DEFAULT 0,
    CONSTRAINT leaderboard_pkey PRIMARY KEY (user_id),
    CONSTRAINT leaderboard_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.leaderboard
    OWNER to postgres;

ALTER TABLE IF EXISTS public.leaderboard
    ENABLE ROW LEVEL SECURITY;
