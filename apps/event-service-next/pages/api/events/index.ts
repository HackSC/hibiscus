import type { NextApiRequest, NextApiResponse } from 'next';
import { getEvents, addEvent } from '../../../src/utils/repository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const METHOD = req.method;
  switch (METHOD) {
    case 'GET':
      await get(req, res);
      break;
    case 'POST':
      await post(req, res);
      break;
    default:
      res.status(400).json({ error: 'INVALID HTTP REQUEST' });
      break;
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  let body = req.body;
  try {
    if (!body) {
      body = {};
    }

    let date = body.date;
    console.log('date', date);
    if (date) {
      date = new Date(date);
      console.log('date', date);
    }

    let after = body.after;
    console.log('after', after);
    if (after) {
      after = new Date(after);
      console.log('after', after);
    }

    let page = body.page;
    console.log('page', page);
    if (!page) {
      page = 1;
    } else {
      page = parseInt(page);
    }
    console.log('page', page);

    let page_size = body.page_size;
    console.log('page_size', page_size);
    if (!page_size) {
      page_size = 20;
    } else {
      page_size = parseInt(page_size);
    }

    const events = await getEvents(
      page,
      page_size,
      body.name,
      body.location,
      date,
      after
    );
    res.status(200).json({ page: page, events: events });
  } catch (error) {
    res.status(400).json({ error: `Failed to get requested events: ${error}` });
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  let event_tags = req.body.eventTags;
  if (event_tags && !Array.isArray(event_tags)) {
    event_tags = [event_tags];
  }

  let industry_tags = req.body.industryTags;
  if (industry_tags && !Array.isArray(industry_tags)) {
    industry_tags = [industry_tags];
  }

  try {
    const event = {
      name: body.eventName,
      description: body.description,
      start_time: body.startTime
        ? new Date(body.startTime).toISOString()
        : undefined,
      end_time: body.endTime ? new Date(body.endTime).toISOString() : undefined,
      location: body.location,
      bp_points: body.bpPoints,
      capacity: body.capacity,
      organizer_details: body.organizerDetails,
    };
    const eventId = await addEvent(event, event_tags, industry_tags);
    res.status(200).json({ event: eventId });
  } catch (error) {
    res.status(400).json({ error: `Failed to add event: ${error}` });
  }
}
