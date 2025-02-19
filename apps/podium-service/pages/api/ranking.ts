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
    case 'GET':
      try {
        const { data, error } = await supabase.from('ranking').select('*');

        if (error) {
          throw new Error('Failed to fetch rankings');
        }

        if (data === null) {
          return res.status(404).json({ error: 'No rankings found' });
        }

        const rankings = data.map((r: any) => ({
          projectId: r.project_id,
          userId: r.user_id,
          rank: r.rank,
        }));

        return res.json({ rankings });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.status(405).end();
      break;
  }
}
