import type { NextApiRequest, NextApiResponse } from 'next';
import repository from '../../../src/utils/repository';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const METHOD = req.method;
  switch (METHOD) {
    case 'GET':
      get(req, res);
      break;
    case 'POST':
      post(req, res);
      break;
    case 'DELETE':
      del(req, res);
      break;
    default:
      res.status(400).json({ error: 'INVALID HTTP REQUEST' });
      break;
  }
}

function get(req: NextApiRequest, res: NextApiResponse) {
  let user_id = req.query.user_id;
  if (Array.isArray(user_id)) {
    user_id = user_id[0];
  }
  try {
    const events = repository.getPinnedEvents(user_id);
    res.status(200).json({ pinnedEvents: events });
  } catch (error) {
    res.status(400).json({ error: `Failed to get pinned events: ${error}` });
  }

  res.status(200).json({ message: 'GET' });
}

function post(req: NextApiRequest, res: NextApiResponse) {
  let user_id = req.query.user_id;
  if (Array.isArray(user_id)) {
    user_id = user_id[0];
  }
  const body = req.body;

  try {
    repository.addPinnedEvent(user_id, body.pin_event);
    res.status(200).json({ pinned_event: body.pin_event });
  } catch (error) {
    res.status(400).json({ error: `Failed to pin event: ${error}` });
  }
}

function del(req: NextApiRequest, res: NextApiResponse) {
  let user_id = req.query.user_id;
  if (Array.isArray(user_id)) {
    user_id = user_id[0];
  }
  const body = req.body;

  try {
    repository.removePinnedEvent(user_id, body.unpin_event);
    res.status(200).json({ unpinned_event: body.unpin_event });
  } catch (error) {
    res.status(400).json({ error: `Failed to unpin event: ${error}` });
  }
}
