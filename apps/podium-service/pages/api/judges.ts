import { supabase } from 'apps/podium-service/libs/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const { data: judgeData, error: judgeError } = await supabase
          .schema('public')
          .from('user_profiles')
          .select('*')
          .eq('role', 7);

        const { data: judgeVerticalData, error: judgeVerticalError } = await supabase
          .from('judges')
          .select('*, verticals!inner(name)');

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
        })

        return res.json({ judges });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    // TODO: This is supposed to send an email not add it to the database? not sure
    case 'POST':
      try {
        const { email, name, password } = body;
        if (!email || typeof email !== 'string') {
          return res.status(400).json({ error: 'Invalid request! Email is required and must be a string.'});
        }

        let firstName, lastName;
        if (typeof name !== undefined) {
          [firstName, lastName] = name.split(' ');
        } else {
          return res.status(400).json({ error: 'Invalid request! Name is required and must be a string.'});
        }

        // TODO: Get user_id from user_profiles
        const addJudge = {
          user_id: null,
          email: email,
          first_name: firstName,
          last_name: lastName,
          role: 7,
        };

        // TODO: This should insert to judges, not user_profiles, we can assume the user exists already?
        const { error } = await supabase
          .schema('public')
          .from('user_profiles')
          .insert(addJudge);

        if (error) {
          throw new Error('Failed to add new judge');
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
