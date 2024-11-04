import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const verticalId = query.verticalId as string;
  const projectId = query.projectId as string;
  const userId = query.userId as string;

  switch (method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('notes')
          .eq('project_id', projectId)
          .eq('user_id', userId);
        
        if (error) {
          throw new Error('Failed to fetch notes');
        }

        if (data === null) {
          return res.status(404).json({ error: 'No notes found' });
        }

        const notes: NotesData = data[0];

        return res.json(notes);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'POST':
      try {
        const { notes } = body;
        if (!notes || typeof notes !== 'string') {
          return res.status(400).json({ error: 'Invalid request! Notes are required and must be a string.'});
        }

        const { error } = await supabase
          .from('notes')
          .insert({
            project_id: projectId,
            user_id: userId,
            notes: notes
          });

        if (error) {
          throw new Error('Failed to add notes');
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
