import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const projectId = query.projectId as string;
  const userId = query.userId as string;

  switch (method) {
    case 'POST':
      try {
        const { comment } = body;
        if (!comment || typeof comment !== 'string') {
          return res.status(400).json({ error: 'Invalid request! Comment is required and must be a string.'});
        }

        const { error } = await supabase
          .from('comments')
          .insert({
            project_id: projectId,
            user_id: userId,
            comment: comment
          });

        if (error) {
          throw new Error('Failed to add new comment');
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
