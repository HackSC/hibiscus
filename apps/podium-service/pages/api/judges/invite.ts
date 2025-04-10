import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case 'OPTIONS':
      return res.status(200).send('ok');
    case 'POST':
      try {
        const { judgeEmail } = body;

        if (!judgeEmail) {
          return res.status(400).json({
            error: 'Invalid Email!',
          });
        }

        const { data, error } = await supabase.auth.admin.inviteUserByEmail(
          judgeEmail
        );

        console.log(error);

        if (error) {
          throw new Error('Failed to send invitation email');
        }

        return res.status(201).end();
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
      }
    default:
      res.status(405).end();
      break;
  }
}
