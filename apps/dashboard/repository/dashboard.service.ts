import { injectable } from 'tsyringe';
import { DashboardRepository } from './dashboard.repository';

type DashboardServiceResponse = {
  data?: any;
  error?: {
    message: string;
    code: string;
  };
};

@injectable()
export class DashboardService {
  constructor(private readonly repo: DashboardRepository) {}

  async inviteAccept(inviteId: string): Promise<DashboardServiceResponse> {
    //Gets invited_id and team_id. Also check if invite exists by checking length of getInvite.
    let result = await this.repo.getInviteInfo(inviteId);
    if (result.data.length === 0) {
      throw new Error('Invite with the given ID does not exist.');
    }

    //extract team_id and invited_id from data object. Should only contain one invitation anyway
    const teamId: string = result.data[0]['team_id'];
    const invitedId: string = result.data[0]['invited_id'];

    //check to make sure team isn't full
    result = await this.repo.getAllTeamMembers(teamId);
    console.log(result.data);
    if (result.data.length >= this.repo.MAX_TEAM_MEMBERS) {
      return {
        error: {
          message: 'Team is already full (4 MEMBER MAX).',
          code: '4_MEMBER_MAX',
        },
      };
    }

    //check to make sure accepted member doesn't already have a team
    result = await this.repo.checkHasNoTeam(invitedId);
    if (result.data.length === 0) {
      throw new Error(
        'Requesting member already has a team. They must leave before the invite can be accepted'
      );
    }

    await this.repo.updateUserWithAcceptedInvite(teamId, invitedId);

    //Assuming invitation already exists in db, otherwise error prob thrown anyway
    result = await this.repo.deleteAcceptedInvite(inviteId);
    return {};
  }
}
