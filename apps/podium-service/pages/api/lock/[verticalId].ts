import { calculateRankings } from 'apps/podium-service/libs/calculateRankings';
import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  const verticalId = query.verticalId as string;

  switch (method) {
    case 'OPTIONS':
      return res.status(200).send('ok');
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('ranking_locks')
          .select()
          .eq('vertical_id', verticalId);

        if (error) {
          throw new Error('Failed to fetch lockings');
        }

        const locked = data.length > 0 ? true : false;

        return res.json({ locked });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'POST':
      try {
        const { error } = await supabase
          .from('ranking_locks')
          .insert({ vertical_id: verticalId });

        if (error) {
          throw new Error('Failed to lock vertical');
        }

        return res.status(201).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'DELETE':
      try {
        const { error } = await supabase
          .from('ranking_locks')
          .delete()
          .eq('vertical_id', verticalId);

        if (error) {
          throw new Error('Failed to unlock vertical');
        }

        calculateRankings(verticalId);

        return res.status(200).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.status(405).end();
      break;
  }
}
