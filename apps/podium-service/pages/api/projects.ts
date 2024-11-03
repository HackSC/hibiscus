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
        const { data, error } = await supabase.from('projects').select('*');

        if (error) {
          throw new Error('Failed to fetch projects');
        }

        if (data === null) {
          return res.status(404).json({ error: 'No projects found' });
        }

        const projects = data.map((p: any) => ({
          projectId: p.project_id,
          projectName: p.name,
          verticalId: p.vertical_id,
          verticalName: p.vertical_name,
          description: p.description,
          videoUrl: p.video_url,
        }));

        return res.json({ projects });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.status(405).end();
      break;
  }
}
