import { injectable } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';

@injectable()
export class InviteRepository {
  private client: SupabaseClient;
  private tableName = 'invitations';
  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }

  async getTeamInvites(teamId: string) {
    return this.client
      .from(this.tableName)
      .select(
        `
			id, 
			created_at, 
			user_profiles!invitations_invited_id_fkey(
				email,
				first_name,
				last_name
			)`
      )
      .eq('team_id', teamId);
  }

  /**
   * Get invites sent to this user
   * @param userId user id to get pending invites for
   * @returns response if successful contains data{inviteId, createdAt, team
   * info, team organizer info i.e the one who sent invite request}
   */
  async getInvitesForUser(userId: string) {
    return this.client
      .from(this.tableName)
      .select(
        `
			id, 
			created_at, 
      teams(id,name,description),
			user_profiles!invitations_organizer_id_fkey(
				email,
				first_name,
				last_name
			)
      `
      )
      .eq('invited_id', userId);
  }
}
