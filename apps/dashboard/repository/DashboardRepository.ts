import { injectable } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';

@injectable()
export class DashboardRepository {
  // inject this wrapper around the Supabase SDK client for use
  constructor(private readonly hbc: HibiscusSupabaseClient) {}

  private readonly client = this.hbc.getClient();
  public readonly MAX_TEAM_MEMBERS = this.hbc.MAX_TEAM_MEMBERS;
  getClient() {
    return this.client;
  }

  //takes teamId, returns the data,error pairing from supabase
  async memberCount(teamId: string) {
    const { data, error } = await this.client
      .from('user_profiles')
      .select()
      .eq('team_id', teamId);

    return { data, error };
  }

  //checks if the user has no team, if it does, then length > 0
  async checkHasNoTeam(userId) {
    const { data, error } = await this.client
      .from('user_profiles')
      .select()
      .eq('user_id', userId)
      .is('team_id', null);
    return { data, error };
  }

  async verifyUserIsOrganizer(userId: string, teamId: string) {
    const { data, error } = await this.client
      .from('teams')
      .select()
      .eq('organizer_id', userId)
      .eq('team_id', teamId);

    if (data.length > 0) {
      return true;
    }

    return false;
  }
}
