create or replace function get_volunteers()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
    select user_id 
    from user_profiles
    where user_profiles.role = 4
$$;

create policy "Allow volunteers to access and modify all rows"
    on public.user_profiles
    for all 
    to authenticated
    using (auth.uid() in (
        select get_volunteers()
    ));