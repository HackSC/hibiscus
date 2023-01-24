create policy "Allow volunteers to access and modify all rows"
    on public.event_log
    for all 
    to authenticated
    using (auth.uid() in (
        select get_volunteers()
    ))
    with check (auth.uid() in (
        select get_volunteers()
    ));

create policy "Allow volunteers to access and modify all rows"
    on public.bonus_points_log
    for all 
    to authenticated
    using (auth.uid() in (
        select get_volunteers()
    ))
    with check (auth.uid() in (
        select get_volunteers()
    ));

create policy "Allow volunteers to access and modify all rows"
    on public.leaderboard
    for all 
    to authenticated
    using (auth.uid() in (
        select get_volunteers()
    ))
    with check (auth.uid() in (
        select get_volunteers()
    ));

create policy "Allow volunteers to access all rows"
    on public.events
    for select 
    to authenticated
    using (auth.uid() in (
        select get_volunteers()
    ))

create policy "Allow volunteers to access all rows"
    on public.bonus_points
    for select 
    to authenticated
    using (auth.uid() in (
        select get_volunteers()
    ))