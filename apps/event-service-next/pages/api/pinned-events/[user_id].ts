import {
  getPinnedEvents,
  addPinnedEvent,
  removePinnedEvent,
} from '../../../src/utils/repository';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const METHOD = req.method;
  switch (METHOD) {
    case 'OPTIONS':
      return res.status(200).send('ok');
    case 'GET':
      await get(req, res);
      break;
    case 'POST':
      await post(req, res);
      break;
    case 'DELETE':
      await del(req, res);
      break;
    default:
      res.status(400).json({ error: 'INVALID HTTP REQUEST' });
      break;
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  let { user_id } = req.query;
  console.log('user_id', user_id);
  if (Array.isArray(user_id)) {
    user_id = user_id[0];
  }
  try {
    const events = await getPinnedEvents(user_id);
    return res.status(200).json({ pinnedEvents: events });
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Failed to get pinned events: ${error}` });
  }

  // res.status(200).json({ message: 'GET' });
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  let user_id = req.query.user_id;
  if (Array.isArray(user_id)) {
    user_id = user_id[0];
  }
  const body = req.body;

  try {
    await addPinnedEvent(user_id, body.pin_event);
    res.status(200).json({ pinned_event: body.pin_event });
  } catch (error) {
    res.status(400).json({ error: `Failed to pin event: ${error}` });
  }
}

async function del(req: NextApiRequest, res: NextApiResponse) {
  let user_id = req.query.user_id;
  if (Array.isArray(user_id)) {
    user_id = user_id[0];
  }
  const body = req.body;
  console.log('body', body);
  try {
    await removePinnedEvent(user_id, body.unpin_event);
    res.status(200).json({ unpinned_event: body.unpin_event });
  } catch (error) {
    res.status(400).json({ error: `Failed to unpin event: ${error}` });
  }
}
