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

async function put(req: NextApiRequest, res: NextApiResponse) {
  let event_id = req.query.event_id;
  if (Array.isArray(event_id)) {
    event_id = event_id[0];
  }

  let event_tags = req.body.event_tags;
  if (event_tags && !Array.isArray(event_tags)) {
    event_tags = [event_tags];
  }

  let industry_tags = req.body.industry_tags;
  if (industry_tags && !Array.isArray(industry_tags)) {
    industry_tags = [industry_tags];
  }

  const body = req.body;
  try {
    //TODO: Dates
    const eventValues = {
      name: body.eventName,
      description: body.description,
      start_time: body.startTime
        ? new Date(body.startTime).toISOString()
        : undefined,
      end_time: body.endTime ? Date.parse(body.endTime).toString() : undefined,
      location: body.location,
      bp_points: body.bpPoints,
      capacity: body.capacity,
      organizer_details: body.organizerDetails,
    };
    // Remove undefined values
    Object.keys(eventValues).forEach((key) => {
      if (eventValues[key] === null || eventValues[key] === undefined) {
        delete eventValues[key];
      }
    });

    const new_event = await updateEvent(
      event_id,
      event_tags,
      industry_tags,
      eventValues
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
