alter table "public"."teams" alter column "team_id" set default uuid_generate_v4();

alter table "public"."invitations" alter column "id" set default uuid_generate_v4();

alter table "public"."invitations" add constraint "invitations_invited_id_fkey" FOREIGN KEY (invited_id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."invitations" validate constraint "invitations_invited_id_fkey";

alter table "public"."invitations" add constraint "invitations_organizer_id_fkey" FOREIGN KEY (organizer_id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."invitations" validate constraint "invitations_organizer_id_fkey";

alter table "public"."invitations" add constraint "invitations_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) not valid;

alter table "public"."invitations" validate constraint "invitations_team_id_fkey";

alter table "public"."teams" add constraint "teams_organizer_id_fkey" FOREIGN KEY (organizer_id) REFERENCES user_profiles(user_id) not valid;

alter table "public"."teams" validate constraint "teams_organizer_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(team_id) not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_team_id_fkey";


