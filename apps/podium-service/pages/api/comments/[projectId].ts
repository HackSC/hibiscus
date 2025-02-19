import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  const projectId = query.projectId as string;

  switch (method) {
    case 'OPTIONS':
      return res.status(200).send('ok');
    case 'GET':
      try {
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('*')
          .eq('project_id', projectId);

        if (commentsError) {
          throw new Error('Failed to fetch comments');
        }

        if (commentsData === null) {
          return res.status(404).json({ error: 'No comments found ' });
        }

        const { data: judgeData, error: judgeError } = await supabase
          .schema('public')
          .from('user_profiles')
          .select('*')
          .eq('role', 7);

        if (judgeError || judgeData === null) {
          throw new Error('Failed to fetch judge information');
        }

        // For faster lookup later
        const judgesMap = new Map();
        judgeData.forEach((judge) => {
          judgesMap.set(
            judge.user_id,
            `${judge.first_name} ${judge.last_name}`
          );
        });

        const comments: CommentData[] = commentsData.map((c: any) => ({
          comment: c.comment,
          name: judgesMap.get(c.user_id),
          profilePicUrl:
            'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
          createdAt: c.created_at,
        }));

        return res.json({ comments });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.status(405).end();
      break;
  }
}
