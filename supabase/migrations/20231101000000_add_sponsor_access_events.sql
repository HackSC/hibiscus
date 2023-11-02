create or replace function get_sponsors()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
    select user_id 
    from user_profiles
    where user_profiles.role = 3
$$;

create policy "Allow sponsors to access all rows"
    on public.user_profiles
    for select
    to authenticated
    using (auth.uid() in (
        select get_sponsors()
    ));

create policy "Allow sponsors to access all rows"
  on public.event_log
  for select 
  to authenticated
  using (auth.uid() in (
      select get_sponsors()
  ))

create policy "Allow sponsors to access all rows"
    on public.events
    for select 
    to authenticated
    using (auth.uid() in (
        select get_sponsors()
    ));

create policy "Allow sponsors to access all rows"
    on public.participants
    for select 
    to authenticated
    using (auth.uid() in (
        select get_sponsors()
    ))
