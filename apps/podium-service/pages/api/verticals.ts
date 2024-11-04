import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const { data, error } = await supabase.from('verticals').select('*');

        if (error) {
          throw new Error('Failed to fetch verticals');
        }

        if (data === null) {
          return res.status(404).json({ error: 'No verticals found' });
        }

        const verticals = data.map((v: any) => ({
          verticalId: v.vertical_id,
          name: v.name,
          description: v.description,
        }));

        return res.json({ verticals });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'POST':
      try {
        const { name, description } = body;
        if (!name || typeof name !== 'string') {
          return res.status(400).json({ error: 'Invalid request! Name is required and must be a string.'});
        }

        const { error } = await supabase
          .from('verticals')
          .insert({ name, description });

        if (error) {
          throw new Error('Failed to add new vertical');
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
