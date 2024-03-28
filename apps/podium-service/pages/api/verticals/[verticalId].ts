import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const verticalId = query.verticalId as string;
  const projectId = query.projectId as string;

  switch (method) {
    case 'PUT':
      const fields = ['name', 'description'];
      const updateVertical = {};

      try {
        const {
          name,
          description,
        } = body;

        fields.forEach((field) => {
          if (typeof body[field] !== undefined) {
            updateVertical[field] = body[field];
          }
        })

        const { error } = await supabase
          .from('verticals')
          .update(updateVertical)
          .eq('vertical_id', verticalId);

        if (error) {
          throw error;
        }

        return res.status(200).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.status(405).end();
      break;
  }
}
