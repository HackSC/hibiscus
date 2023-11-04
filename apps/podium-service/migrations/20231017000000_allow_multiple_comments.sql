-- Add ID column
ALTER TABLE public.comments
ADD COLUMN comment_id UUID NOT NULL DEFAULT gen_random_uuid();

-- Change primary key
BEGIN;
    ALTER TABLE public.comments 
    DROP CONSTRAINT comments_pkey;

    ALTER TABLE public.comments
    ADD PRIMARY KEY (comment_id);

COMMIT;