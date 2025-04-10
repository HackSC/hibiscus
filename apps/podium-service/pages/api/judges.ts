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
        const { data: judgeData, error: judgeError } = await supabase
          .schema('public')
          .from('user_profiles')
          .select('*')
          .eq('role', 7);

        const { data: judgeVerticalData, error: judgeVerticalError } =
          await supabase.from('judges').select('*, verticals!inner(name)');

        if (judgeError || judgeVerticalError) {
          throw new Error('Failed to fetch judges');
        }

        if (judgeData === null) {
          return res.status(404).json({ error: 'No judges found' });
        }

        const judges: JudgeData[] = judgeData.map((j: any) => ({
          id: j.user_id,
          name: j.first_name + ' ' + j.last_name,
          email: j.email,
          verticalId: null,
          verticalName: null,
        }));

        // For faster lookup later
        const judgesMap = new Map();
        judges.forEach((judge) => {
          judgesMap.set(judge.id, judge);
        });

        judgeVerticalData.forEach((j: any) => {
          const judge = judgesMap.get(j.user_id);
          if (judge) {
            judge.verticalId = j.vertical_id;
            judge.verticalName = j.verticals.name;
          }
        });

        return res.json({ judges });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    case 'POST':
      return res.status(501).json({ error: 'Not implemented' });
    default:
      res.status(405).end();
      break;
  }
}
