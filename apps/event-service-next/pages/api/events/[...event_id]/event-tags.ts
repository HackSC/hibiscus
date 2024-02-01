import type { NextApiRequest, NextApiResponse } from 'next';
import repository from '../../../../src/utils/repository';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const METHOD = req.method;
  switch (METHOD) {
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

function post(req: NextApiRequest, res: NextApiResponse) {
  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }
  const body = req.body;
  try {
    repository.addEventTag(event_id, body.eventTag);
    res.status(200).json({ eventTag: body.eventTag });
  } catch (error) {
    res.status(400).json({ error: `Failed to add tag: ${error}` });
  }
}

function del(req: NextApiRequest, res: NextApiResponse) {
  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }
  const body = req.body;
  try {
    repository.removeEventTag(event_id, body.eventTag);
    res.status(200).json({ eventTag: body.eventTag });
  } catch (error) {
    res.status(400).json({ error: `Failed to remove tag: ${error}` });
  }
}
