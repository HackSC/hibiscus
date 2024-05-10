import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const verticalId  = query.verticalId as string;
  const projectId = query.projectId as string;

  switch (method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('projects')
          .select()
          .eq('vertical_id', verticalId)
          .eq('project_id', projectId);

        if (error) {
          throw error;
        }

        if (data === null) {
          return res.status(404).json({ error: 'No project found' });
        }

        const project: ProjectData = data[0];

        return res.json(project);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'PUT':
      const fields = ['name', 'teamMembers', 'description', 'imageUrl', 'devpostUrl', 'videoUrl'];
      const fieldsDB = ['name',' team', 'description', 'image_url', 'devpost_url', 'video_url'];
      const updateProject: Partial<EditableProjectData> = {};

      try {
        const {
          name,
          teamMembers,
          description,
          imageUrl,
          devpostUrl,
          videoUrl,
          verticalNew,
        } = body;

        for (let i = 0; i < fields.length; i++) {
          if (typeof body[fields[i]] !== undefined) {
            updateProject[fieldsDB[i]] = body[fields[i]];
          }
        }

        if (typeof verticalNew !== 'undefined') {
          updateProject['vertical_id'] = verticalNew;
        }

        const { error } = await supabase
          .from('projects')
          .update(updateProject)
          .eq('vertical_id', verticalId)
          .eq('project_id', projectId);

        if (error) {
          throw error;
        }

        return res.status(200).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'DELETE':
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('vertical_id', verticalId)
          .eq('project_id', projectId);

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
