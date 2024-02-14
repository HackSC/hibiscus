import type { NextApiRequest, NextApiResponse } from 'next';
import { getEvents, addEvent } from '../../../src/utils/repository';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const METHOD = req.method;
  switch (METHOD) {
    case 'GET':
      get(req, res);
      break;
    case 'POST':
      post(req, res);
      break;
    default:
      res.status(400).json({ error: 'INVALID HTTP REQUEST' });
      break;
  }
}

function get(req: NextApiRequest, res: NextApiResponse) {
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

    const events = getEvents(
      page,
      page_size,
      date,
      after,
      body.name,
      body.location
    );
    res.status(200).json({ page: page, events: events });
  } catch (error) {
    res.status(400).json({ error: `Failed to get requested events: ${error}` });
  }
}

function post(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Implement This
  const body = req.body;
  try {
    const event = addEvent(body);
    res.status(200).json({ event: event });
  } catch (error) {
    res.status(400).json({ error: `Failed to add event: ${error}` });
  }
}
