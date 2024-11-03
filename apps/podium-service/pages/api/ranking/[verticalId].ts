import { calculateRankings } from 'apps/podium-service/libs/calculateRankings';
import { isLocked } from 'apps/podium-service/libs/isLocked';
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
        // If the vertical is not locked, then calculate the overall rankings first
        if (!isLocked(verticalId)) {
          calculateRankings(verticalId);
        }

        const { data, error } = await supabase
          .from('projects')
          .select(
            `*, 
            ranking_final( rank ), 
            verticals( name )`
          )
          .eq('vertical_id', verticalId);

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
          rank: p.ranking_final ? p.ranking_final.rank : null,
        }));

        return res.json({ projects });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'POST':
      try {
        const { projectId, newRanking } = body;

        if (newRanking < 1) {
          throw new Error('Invalid ranking');
        }

        if (!isLocked(verticalId)) {
          throw new Error('Vertical has to be locked first');
        }

        /*
          CREATE OR REPLACE FUNCTION podium.update_ranking(new_ranking int, project uuid) 
          RETURNS VOID AS
          $$
          DECLARE
              old_ranking int;
          BEGIN
              SELECT rank INTO old_ranking FROM ranking_final WHERE project_id = project;
              IF new_ranking < old_ranking THEN
                  UPDATE ranking_final SET rank = rank + 1 WHERE rank >= new_ranking AND rank < old_ranking;
              END IF;
              IF new_ranking > old_ranking THEN
                  UPDATE ranking_final SET rank = rank - 1 WHERE rank > old_ranking AND rank <= new_ranking;
              END IF;
              UPDATE ranking_final SET rank = new_ranking WHERE project_id = project;
          END;
          $$ 
          LANGUAGE plpgsql VOLATILE;
        */
        const { error } = await supabase.rpc('update_ranking', {
          new_ranking: newRanking,
          find_project_id: projectId,
        });

        if (error) {
          throw new Error('Failed to edit project ranking');
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
