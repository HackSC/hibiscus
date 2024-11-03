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
          .from('projects')
          .select('*, verticals!inner(name)')
          .eq('vertical_id', verticalId);

        if (error) {
          throw error;
        }

        if (data === null) {
          return res.status(404).json({ error: 'No projects found' });
        }

        const projects = data.map((p: any) => ({
          projectId: p.project_id,
          projectName: p.name,
          verticalId: p.vertical_id,
          verticalName: p.verticals.name,
          teamMembers: p.team,
          description: p.description,
          imageUrl: p.image_url,
          devpostUrl: p.devpost_url,
          videoUrl: p.video_url,
        }));

        return res.json({ projects });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'POST':
      const fields = [
        'name',
        'teamMembers',
        'description',
        'imageUrl',
        'devpostUrl',
        'videoUrl',
      ];
      const fieldsDB = [
        'name',
        'team',
        'description',
        'image_url',
        'devpost_url',
        'video_url',
      ];
      const addProject = {};

      try {
        const {
          name,
          teamMembers,
          description,
          imageUrl,
          devpostUrl,
          videoUrl,
        } = body;

        for (let i = 0; i < fields.length; i++) {
          if (typeof body[fields[i]] !== undefined) {
            addProject[fieldsDB[i]] = body[fields[i]];
          }
        }

        addProject['vertical_id'] = verticalId;

        const { error } = await supabase.from('projects').insert(addProject);

        if (error) {
          throw new Error('Failed to add new project');
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
