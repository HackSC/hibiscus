import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import { getTokensFromNextRequest } from '../../../../common/utils';

const handler: NextApiHandler = async (req, res) => {
  if (req.method == 'PUT') {
    const hibiscus = container.resolve(HibiscusSupabaseClient);
    hibiscus.setOptions({ useServiceKey: true });

    const { accessToken } = getTokensFromNextRequest(req);
    const user = (await hibiscus.getUserProfile(accessToken)).user_id;

    const {
      newName,
      newFieldOfStudy,
      newBio,
      newSchool,
      newGradYear,
      newUsername,
    } = req.body;

    console.log("Body", req.body);
  
    if (newName && newName.split(' ').length !== 2) {
      return res.status(400).json({ message: 'Not a full name.' });
    }

    const resCheckIfExist = await hibiscus
      .getClient()
      .from('user_profiles')
      .select('user_id')
      .eq('user_id', user);

    if (resCheckIfExist.error != null) {
      return res.status(500).json({ message: resCheckIfExist.error.message });
    }

    if (resCheckIfExist.data.length === 0) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const resCheckParticipantExist = await hibiscus
      .getClient()
      .from('participants')
      .select('id')
      .eq('id', user);

    let resUpdateParticipants;

    if (resCheckParticipantExist.error) {
      resUpdateParticipants = await hibiscus
        .getClient()
        .from('participants')
        .insert({
          id: user,
          major: newFieldOfStudy,
          school: newSchool,
          graduation_year: newGradYear,
        });
    } else {
      resUpdateParticipants = await hibiscus
        .getClient()
        .from('participants')
        .update({
          major: newFieldOfStudy,
          school: newSchool,
          graduation_year: newGradYear,
        })
        .eq('id', user);
    }

    if (resUpdateParticipants.error) {
      return res
        .status(500)
        .json({ message: resUpdateParticipants.error.message });
    }

    console.log(newUsername);

    const resUpdateUserProfiles = await hibiscus
      .getClient()
      .from('user_profiles')
      .update({
        first_name: newName?.split(' ')[0],
        last_name: newName?.split(' ')[1],
        username: newUsername,
        bio: newBio,
      })
      .eq('user_id', user);

    if (resUpdateUserProfiles.error != null) {
      return res
        .status(500)
        .json({ message: resUpdateUserProfiles.error.message });
    }

    return res.status(200).json({
      message: 'Success',
    });
  } else {
    return res.status(405).json({ message: 'Invalid request type.' });
  }
};

export default handler;
