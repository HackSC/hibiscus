import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getEvent,
  getEventAdmin,
  updateEvent,
  deleteEvent,
} from '../../../../src/utils/repository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const METHOD = req.method;
  switch (METHOD) {
    case 'GET':
      await get(req, res);
      break;
    case 'PUT':
      put(req, res);
      break;
    case 'DELETE':
      del(req, res);
      break;
    default:
      res.status(400).json({ error: 'INVALID HTTP REQUEST' });
      break;
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Check auth role
  let { event_id } = req.query;
  const isAdmin = true;
  let event;

  // Ensure event_id is not an array
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }

  try {
    if (isAdmin) {
      event = await getEventAdmin(event_id);
    } else {
      event = await getEvent(event_id);
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: `Failed to get requested event: ${error}` });
  }
}

function put(req: NextApiRequest, res: NextApiResponse) {
  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }
  const body = req.body;
  try {
    const new_event = updateEvent(
      event_id,
      body.event_tags ? body.event_tags : undefined,
      body.industry_tags ? body.industry_tags : undefined,
      {
        name: body.name ? body.eventName : undefined,
        description: body.description ? body.description : undefined,
        start_time: body.startTime ? body.start_time : undefined,
        end_time: body.endTime ? body.end_time : undefined,
        location: body.location ? body.location : undefined,
        bp_points: body.bpPoints ? body.bp_points : undefined,
        capacity: body.capacity ? body.capacity : undefined,
        organizer_details: body.organizerDetails
          ? body.organizer_details
          : undefined,
      }
    );
    res.status(200).json(new_event);
  } catch (error) {
    res.status(400).json({ error: `Failed to update event: ${error}` });
  }
}

function del(req: NextApiRequest, res: NextApiResponse) {
  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }
  try {
    deleteEvent(event_id);
    res.status(200).json({ deleted: event_id });
  } catch (error) {
    res.status(400).json({ error: `Failed to delete event: ${error}` });
  }
}
