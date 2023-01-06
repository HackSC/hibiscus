import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
// import entire SDK
import AWS from 'aws-sdk';
// import individual service
import S3 from 'aws-sdk/clients/s3';

export default async function invite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const supabase = repo.getClient();

  let teamId = req.body.team_id;
  let email = req.body.email;
  let organizerId = req.body.organizer_id;
  let invitedId = req.body.invited_id;

  //check to make sure team isn't full
  let result = await repo.memberCount(teamId);
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }
  if (result.data.length >= repo.MAX_TEAM_MEMBERS) {
    return res
      .status(500)
      .json({ message: 'Team is already full (4 members max).' });
  }

  //add check that invited user email even exists
  let checkEmailExists = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select()
      .eq('email', email);

    return { data, error };
  };

  result = await checkEmailExists();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }
  //length 0 if user with email does not exist
  if (result.data.length === 0) {
    return res
      .status(500)
      .json({ message: 'Invitation email does not exist.' });
  }

  const { error } = await supabase.from('invitations').insert([
    {
      organizer_id: organizerId, //TODO: go over the parameter name scheme for endpoints. user_id or inviter_id
      invited_id: invitedId,
      team_id: teamId,
    },
  ]);

  if (error) {
    return res.status(500).json({ message: error.message });
  }
  //add logic for emailing invite
  //need team name, organizer's name
  //invite email will link to the online version and send invite_id
  let ses = new AWS.SES();
  let template = ses.createTemplate();
  let params = {
    RawMessage: {
      /* required */
      Data:
        Buffer.from('...') ||
        'test message from aws.' /* Strings will be Base-64 encoded on your behalf */ /* required */,
    },
    ConfigurationSetName: 'Simple Email Test',
    Destinations: [
      'benhwang@usc.edu',
      /* more items */
    ],
    // FromArn: 'STRING_VALUE',
    // ReturnPathArn: 'STRING_VALUE',
    Source: 'test@notifications.hacksc.com',
    // SourceArn: 'STRING_VALUE',
    // Tags: [
    //   {
    //     Name: 'Hacksc Invite', /* required */
    //     Value: 'STRING_VALUE' /* required */
    //   },
    //   /* more items */
    // ]
  };
  ses.sendRawEmail(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });

  return res.status(200).json({ message: 'Invite sent successfully!' });
}
