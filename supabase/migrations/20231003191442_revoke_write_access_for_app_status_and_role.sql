revoke insert, update on table user_profiles from anon;
revoke insert, update on table user_profiles from authenticated;

grant insert (user_id, first_name, last_name, team_id, email, app_id, attendance_confirmed), update (first_name, last_name, team_id, email, app_id, attendance_confirmed) on table user_profiles to anon;
grant insert (user_id, first_name, last_name, team_id, email, app_id, attendance_confirmed), update (first_name, last_name, team_id, email, app_id, attendance_confirmed) on table user_profiles to authenticated;
