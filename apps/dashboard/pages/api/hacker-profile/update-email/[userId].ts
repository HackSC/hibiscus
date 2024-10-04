import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query;
  const userIdString = userId.toString();

  const {
    newName,
    newUsername,
    newPassword,
    newFieldOfStudy,
    newBio,
    newSchool,
    newGradYear,
  } = req.body;

  if (req.method == 'PUT') {
    const supabase = container.resolve(HibiscusSupabaseClient);
    supabase.setOptions({ useServiceKey: true });

    const resEmail = await supabase
      .getClient()
      .from('user_profiles')
      .select('email')
      .eq('user_id', userIdString);

    if (resEmail.error != null) {
      return res.status(500).json({ message: resEmail.error.message });
    }

    if (resEmail.data.length === 0) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const resUpdate = await supabase
      .getClient()
      .from('user_profiles')
      .update({
        name: newName,
        username: newUsername,
        password: newPassword,
        field_of_study: newFieldOfStudy,
        bio: newBio,
        school: newSchool,
        grad_year: newGradYear,
      })
      .eq('user_id', userIdString);

    if (resUpdate?.code != null) {
      return res.status(500).json({ message: resUpdate?.message });
    }

    const resAfter = await supabase
      .getClient()
      .from('user_profiles')
      .select('email')
      .eq('user_id', userIdString);

    return res
      .status(200)
      .json({ message: 'Success', newEmail: resAfter.data[0].email });
  } else {
    return res.status(405).json({ message: 'Invalid request type.' });
  }
};

export default handler;
