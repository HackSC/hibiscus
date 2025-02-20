import type { NextApiRequest, NextApiResponse } from 'next';
import { getRSVPUsers } from '../../../../src/utils/repository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'METHOD NOT ALLOWED' });
    return;
  }

  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }
  try {
    const rsvps = await getRSVPUsers(event_id);
    res.status(200).json({ participants: rsvps });
  } catch (error) {
    res.status(400).json({ error: `Failed to get participants: ${error}` });
  }
}
