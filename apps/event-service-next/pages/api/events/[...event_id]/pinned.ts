import type { NextApiRequest, NextApiResponse } from 'next';
import repository from '../../../../src/utils/repository';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }
  try {
    const rsvps = repository.getRSVPUsers(event_id);
    res.status(200).json({ participants: rsvps });
  } catch (error) {
    res.status(400).json({ error: `Failed to get participants: ${error}` });
  }
}
