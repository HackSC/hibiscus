import type { NextApiRequest, NextApiResponse } from 'next';
import repository from '../../../src/utils/repository';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Check auth role
  let { event_id } = req.query;
  const isAdmin = false;
  let event;

  // Ensure event_id is not an array
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }

  try {
    if (isAdmin) {
      event = repository.getEventAdmin(event_id);
    } else {
      event = repository.getEvent(event_id);
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: `Failed to get requested event: ${error}` });
  }
}
