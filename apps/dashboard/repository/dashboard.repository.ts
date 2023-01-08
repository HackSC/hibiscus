import { injectable } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';

@injectable()
export class DashboardRepository {
  // inject this wrapper around the Supabase SDK client for use
  constructor(private readonly hbc: HibiscusSupabaseClient) {}

  private readonly client = this.hbc.getClient();
  public readonly MAX_TEAM_MEMBERS: number = parseInt(
    process.env.NEXT_PUBLIC_MAX_TEAM_MEMBERS
  );

  getClient() {
    return this.client;
  }

  async getAllTeamMembers(teamId: string) {
    const { data, error } = await this.client
      .from('user_profiles')
      .select()
      .eq('team_id', teamId);
    return { data, error };
  }

  //checks if the user has no team, if it does, then length > 0
  async checkHasNoTeam(userId: string) {
    const { data, error } = await this.client
      .from('user_profiles')
      .select()
      .eq('user_id', userId)
      .is('team_id', null);
    return { data, error };
  }

  async verifyUserIsOrganizer(userId: string, teamId: string) {
    const { data } = await this.client
      .from('teams')
      .select()
      .eq('organizer_id', userId)
      .eq('team_id', teamId);

    if (data.length > 0) {
      return true;
    }

    return false;
  }

  async insertTeam(
    name: string,
    description: string,
    photoKey: string,
    organizerId: string
  ) {
    const { data, error } = await this.client
      .from('teams')
      .insert([
        {
          name: name,
          description: description,
          photo_key: photoKey,
          organizer_id: organizerId,
        },
      ])
      .select();
    return { data, error };
  }

  async updateOrganizerTeam(team_id: string, organizerId: string) {
    const { data, error } = await this.client
      .from('user_profiles')
      .update({ team_id: team_id })
      .eq('user_id', organizerId);

    return { data, error };
  }

  async updateAllTeamMembersToNull(teamId: string) {
    const { data, error } = await this.client
      .from('user_profiles')
      .update({ team_id: null })
      .eq('team_id', teamId)
      .select();

    return { data, error };
  }

  async deleteTeamInvites(teamId: string) {
    const { data, error } = await this.client
      .from('invitations')
      .delete()
      .eq('team_id', teamId);
    return { data, error };
  }

  async deleteTeam(teamId: string) {
    const { data, error } = await this.client
      .from('teams')
      .delete()
      .eq('team_id', teamId);
    return { data, error };
  }

  async updateKickedUser(kickId: string, teamId: string) {
    const { data, error } = await this.client
      .from('user_profiles')
      .update({ team_id: null })
      .eq('user_id', kickId)
      .eq('team_id', teamId)
      .select();

    return { data, error };
  }

  async getInviteInfo(inviteId: string) {
    const { data, error } = await this.client
      .from('invitations')
      .select()
      .eq('id', inviteId);

    return { data, error };
  }

  async updateUserWithAcceptedInvite(teamId: string, invitedId: string) {
    const { data, error } = await this.client
      .from('user_profiles')
      .update({ team_id: teamId })
      .eq('user_id', invitedId);

    return { data, error };
  }

  async deleteAcceptedInvite(inviteId: string) {
    const { data, error } = await this.client
      .from('invitations')
      .delete()
      .eq('id', inviteId);

    return { data, error };
  }
}
