import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  const judgeId = query.judgeId as string;

  switch (method) {
    case 'OPTIONS':
      return res.status(200).send('ok');
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('judges')
          .select('*, verticals!inner(name)')
          .eq('user_id', judgeId);

        if (error) {
          throw new Error('Failed to fetch judges');
        }

        if (data === null) {
          return res.status(404).json({ error: 'No judges found' });
        }

        const judge = {
          id: data[0].user_id,
          verticalId: data[0].vertical_id,
          verticalName: data[0].verticals.name,
        };

        return res.json(judge);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'POST':
      try {
        const { verticalId } = body;
        if (!verticalId || typeof verticalId !== 'string') {
          return res.status(400).json({
            error:
              'Invalid request! Vertical ID is required and must be a string.',
          });
        }

        const { error } = await supabase
          .from('judges')
          .upsert({ user_id: judgeId, vertical_id: verticalId });

        if (error) {
          throw new Error('Failed to set judge vertical');
        }

        return res.status(201).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.status(405).end();
      break;
  }
}
