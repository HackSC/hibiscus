create policy "Allow volunteers to access and modify all rows"
    on public.participants
    for all 
    to authenticated
    using (auth.uid() in (
        select get_volunteers()
    ))
    with check (auth.uid() in (
        select get_volunteers()
    ));

alter publication supabase_realtime add table public.event_log;