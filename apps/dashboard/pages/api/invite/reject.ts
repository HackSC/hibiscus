import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
/**
 * [inviteReject - When the team leader rejects the join request by another user]
 * @param  {[NextApiRequest]} req - (user_id) : (string)
 * @param {[NextApiResponse]} res - Only used for returning Json messages
 * @return {[NextApiResponse]} 500 if error in creation like Postgres error.
 *  200 if join request was rejected successfully.
 */
export default async function inviteReject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const supabase = repo.getClient();

  //only need to delete the invitation
  //Assuming invitation already exists in db, otherwise error prob thrown anyway
  const query = req.query;
  const { inviteId } = query;

  let deleteAcceptedInvite = async () => {
    const { data, error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', inviteId);

    return { data, error };
  };
  //do I need to notify organizer the invitation was rejected?

  let result = await deleteAcceptedInvite();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  } else {
    return res
      .status(200)
      .json({ message: 'Invite request successfully rejected.' });
  }

  //TODO: add redirect to whatever page needs to go
}
