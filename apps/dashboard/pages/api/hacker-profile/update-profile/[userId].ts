import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query;
  const userIdString = userId.toString();

  const { newName, newFieldOfStudy, newBio, newSchool, newGradYear } = req.body;

  if (newName && newName.split(' ').length !== 2) {
    return res.status(400).json({ message: 'Not a full name.' });
  }

  if (req.method == 'PUT') {
    const supabase = container.resolve(HibiscusSupabaseClient);
    supabase.setOptions({ useServiceKey: true });

    const resCheckIfExist = await supabase
      .getClient()
      .from('participants')
      .select('first_name')
      .eq('id', userIdString);

    if (resCheckIfExist.error != null) {
      return res.status(500).json({ message: resCheckIfExist.error.message });
    }

    if (resCheckIfExist.data.length === 0) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const resUpdateParticipants = await supabase
      .getClient()
      .from('participants')
      .update({
        major: newFieldOfStudy,
        school: newSchool,
        graduation_year: newGradYear,
      })
      .eq('id', userIdString);

    if (resUpdateParticipants.error != null) {
      return res
        .status(500)
        .json({ message: resUpdateParticipants.error.message });
    }

    const resUpdateUserProfiles = await supabase
      .getClient()
      .from('user_profiles')
      .update({
        first_name: newName.split(' ')[0],
        last_name: newName.split(' ')[1],
        bio: newBio,
      })
      .eq('user_id', userIdString);

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
