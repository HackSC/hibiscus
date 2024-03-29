-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE IF EXISTS public.user_profiles
    ADD COLUMN app_id uuid;
ALTER TABLE IF EXISTS public.user_profiles
    ADD CONSTRAINT user_profiles_app_id_key UNIQUE (app_id);

ALTER TABLE "public"."user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) NOT VALID;

ALTER TABLE "public"."user_profiles" VALIDATE CONSTRAINT "user_profiles_user_id_fkey";