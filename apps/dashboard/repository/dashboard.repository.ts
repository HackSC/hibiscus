import { injectable } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import {
  SESClient,
  CreateTemplateCommand,
  SendTemplatedEmailCommand,
  GetTemplateCommand,
  SendEmailCommand,
  UpdateTemplateCommand,
} from '@aws-sdk/client-ses';
import { getEnv } from '@hibiscus/env';

@injectable()
export class DashboardRepository {
  // inject this wrapper around the Supabase SDK client for use
  constructor(private readonly hbc: HibiscusSupabaseClient) {}

  private readonly client = this.hbc.getClient();
  private static readonly env = getEnv();
  private static readonly ses = new SESClient({
    credentials: {
      accessKeyId: DashboardRepository.env.Hibiscus.AWS.accessKeyID,
      secretAccessKey: DashboardRepository.env.Hibiscus.AWS.secretAccessKey,
    },
    region: DashboardRepository.env.Hibiscus.AWS.region,
  });

  //TODO: refactor
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

  async getTeamInfo(teamId: string) {
    const { data, error } = await this.client
      .from('teams')
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

  async checkInviteDoesNotExist(teamId: string, invitedId: string) {
    const { data, error } = await this.client
      .from('invitations')
      .select()
      .eq('team_id', teamId)
      .eq('invited_id', invitedId);

    if (data.length === 0) {
      return true;
    }
    return false;
  }

  async createInvite(organizerId: string, invitedId: string, teamId: string) {
    const { data, error } = await this.client
      .from('invitations')
      .insert([
        {
          organizer_id: organizerId,
          invited_id: invitedId,
          team_id: teamId,
        },
      ])
      .select();

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

  async getUserByEmailAndId(invitedId: string, email: string) {
    const { data, error } = await this.client
      .from('user_profiles')
      .select()
      .eq('email', email)
      .eq('user_id', invitedId);

    return { data, error };
  }

  async sendTeamInviteEmail(
    toAddress: string,
    recipient: string,
    organizerName: string,
    teamName: string,
    invitationId: string
  ) {
    const TEMPLATE_NAME = 'InviteTemplate';
    const acceptInviteLink =
      process.env.NEXT_PUBLIC_SSO_DEFAULT_REDIRECT_URL +
      `/api/invite/accept?inviteId=${invitationId}`;
    const rejectInviteLink =
      process.env.NEXT_PUBLIC_SSO_DEFAULT_REDIRECT_URL +
      `/api/invite/reject?inviteId=${invitationId}`;
    console.log(acceptInviteLink);
    console.log(rejectInviteLink);
    const createTemplateEmail = (templateName) => {
      return new SendTemplatedEmailCommand({
        Destination: { ToAddresses: [toAddress] },
        TemplateData: JSON.stringify({
          name: recipient,
          organizerName: organizerName,
          teamName: teamName,
          acceptInviteLink: acceptInviteLink,
          rejectInviteLink: rejectInviteLink,
        }),
        Source: 'no-reply@notifications.hacksc.com',
        Template: templateName,
      });
    };
    const sendTemplatedEmail = createTemplateEmail(TEMPLATE_NAME);

    try {
      await DashboardRepository.ses.send(sendTemplatedEmail);
      console.log('Email send successfully.');
      return; //if successful, just return. Otherwise throw error which will be caught in invite.ts
    } catch (err) {
      throw new Error('Failed to send email successfully.');
    }
  }
}
