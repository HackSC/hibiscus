import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const commentId = query.commentId as string;

  switch (method) {
    case 'PUT':
      try {
        const { comment } = body;
        if (!comment || typeof comment !== 'string') {
          return res.status(400).json({ error: 'Invalid request! Comment is required and must be a string.'});
        }

        const { error } = await supabase
          .from('comments')
          .update({ comment: comment })
          .eq('comment_id', commentId);

        if (error) {
          throw new Error('Failed to edit comment');
        }

        return res.status(204).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.status(405).end();
      break;
  }
}
