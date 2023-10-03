alter table public.leaderboard
add column total_points integer generated always as (bonus_points + event_points) stored;