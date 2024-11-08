import { addEventTag, removeEventTag } from '../../../../src/utils/repository';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const METHOD = req.method;
  switch (METHOD) {
    case 'OPTIONS':
      return res.status(200).send('ok');
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

async function post(req: NextApiRequest, res: NextApiResponse) {
  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }
  const body = req.body;
  if (Array.isArray(body.eventTag)) {
    return res.status(400).json({ error: 'Can only add one tag at at time.' });
  }
  try {
    await addEventTag(event_id, body.eventTag);
    res.status(200).json({ eventTag: body.eventTag });
  } catch (error) {
    res.status(400).json({ error: `Failed to add tag: ${error}` });
  }
}

async function del(req: NextApiRequest, res: NextApiResponse) {
  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }
  const body = req.body;
  try {
    await removeEventTag(event_id, body.eventTag);
    res.status(200).json({ eventTag: body.eventTag });
  } catch (error) {
    res.status(400).json({ error: `Failed to remove tag: ${error}` });
  }
}
