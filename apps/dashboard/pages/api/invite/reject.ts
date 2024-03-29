import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
/**
 * inviteReject - When the team leader rejects the join request by another user]
 * @param req - (invite_id) : (string)
 * @param res - Only used for returning Json messages
 * @return 500 if error in creation like Postgres error.
 *  200 if join request was rejected successfully.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(401).send({ message: 'Method not supported' });
  }

  try {
    const repo = container.resolve(DashboardRepository);

    //only need to delete the invitation
    //Assuming invitation already exists in db, otherwise error prob thrown anyway
    const { inviteId } = req.body;

    const stringifyInviteId = inviteId.toString();

    if (!inviteId) {
      throw new Error('Invite ID is missing.');
    }

    //check if invite exists by checking length of getInvite
    let result = await repo.getInviteInfo(stringifyInviteId);
    if (result.data.length === 0) {
      throw new Error('Invite with the given ID does not exist.');
    }

    //do I need to notify organizer the invitation was rejected?
    result = await repo.deleteAcceptedInvite(stringifyInviteId);
    return res
      .status(200)
      .json({ message: 'Invite request successfully rejected.' });

    //TODO: add redirect to whatever page needs to go
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
