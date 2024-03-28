import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      const fields = ['name', 'teamMembers', 'description', 'imageUrl', 'devpostUrl', 'videoUrl'];
      const fieldsDB = ['name', 'team', 'description', 'image_url', 'devpost_url', 'video_url'];
      const addProjects = [];
      const verticals = {};

      try {
        const { data, error } = await supabase.from('verticals').select('*');

        if (error) {
          throw new Error('Failed to fetch verticals');
        }

        data.forEach((v: any) => {
          verticals[v.name] = v.vertical_id;
        });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      try {
        const { data } = body;

        data.forEach((p) => {
          if (!p.vertical || typeof p.vertical !== 'string' || typeof p.name !== 'string') {
            return res.status(400).json({ error: 'Invalid request! Name and vertical are required and must be strings.'});
          } else if (!verticals?.[p.vertical]) {
            return res.status(400).json({ error: 'The specified vertical does not exist.' });
          }
          
          const project = {};
          project['vertical_id'] = verticals[p.vertical];

          for (let i = 0; i < fields.length; i++) {
            if (typeof p[fields[i]] !== undefined) {
              project[fieldsDB[i]] = p[fields[i]];
            }
          }

          addProjects.push(project);
        })

        const { error } = await supabase
          .from('projects')
          .insert(addProjects);

        if (error) {
          throw new Error('Failed to add new projects');
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
