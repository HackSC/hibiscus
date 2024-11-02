import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  const verticalId = query.verticalId as string;
  const userId = query.userId as string;

  switch (method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(
            `*, 
            ranking( rank ), 
            verticals( name )`
          )
          .eq('vertical_id', verticalId)
          .eq('ranking.user_id', userId);

        if (error) {
          throw error;
        }

        if (data === null) {
          return res.status(404).json({ error: 'No rankings found' });
        }

        const projects = data.map((p: any) => ({
          projectId: p.project_id,
          projectName: p.name,
          verticalId: p.vertical_id,
          verticalName: p.verticals.name,
          rank: p.ranking.length > 0 ? p.ranking[0].rank : null,
        }));

        return res.json({ rankings: projects });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'POST':
      try {
        const { projectId, newRanking } = body;

        if (newRanking < 1) {
          throw new Error('Invalid ranking');
        }

        /*
          CREATE OR REPLACE FUNCTION podium.update_ranking_user(new_ranking int, find_project_id uuid, find_user_id varchar) 
          RETURNS VOID AS
          $$
          DECLARE
              old_ranking int;
          BEGIN
              SELECT rank INTO old_ranking FROM ranking WHERE project_id = find_project_id AND user_id = find_user_id;
              IF old_ranking IS NULL THEN
                  old_ranking := 999;
                  INSERT INTO ranking (project_id, user_id, rank)
                      VALUES (find_project_id, find_user_id, old_ranking);
              END IF;
              IF new_ranking < old_ranking THEN
                  UPDATE ranking SET rank = rank + 1 WHERE rank >= new_ranking AND rank < old_ranking AND user_id = find_user_id;
              END IF;
              IF new_ranking > old_ranking THEN
                  UPDATE ranking SET rank = rank - 1 WHERE rank > old_ranking AND rank <= new_ranking AND user_id = find_user_id;
              END IF;
              UPDATE ranking SET rank = new_ranking WHERE project_id = find_project_id AND user_id = find_user_id;
          END;
          $$ 
          LANGUAGE plpgsql VOLATILE;
        */
        const { error } = await supabase.rpc('update_ranking_user', {
          new_ranking: newRanking,
          find_project_id: projectId,
          find_user_id: userId,
        });

        if (error) {
          throw new Error('Failed to edit project ranking');
        }

        return res.status(201).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'DELETE':
      try {
        const { projectId } = body;

        const { error } = await supabase.rpc('delete_ranking_user', {
          find_project_id: projectId,
          find_user_id: userId,
        });

        return res.status(200).end();
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.status(405).end();
      break;
  }
}
