import { getEnv } from '@hibiscus/env';
import axios, { AxiosError } from 'axios';

// Type definitions

export type Event = {
  eventId: string;
  eventName: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
  eventTags?: string[];
  industryTags?: string[];
  bpPoints: number;
};

export class EventServiceError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unknown error occured');
  }

  static handleAxiosError(e: AxiosError): EventServiceError {
    if (
      e.response &&
      typeof e.response.data === 'object' &&
      'error' in e.response.data &&
      typeof e.response.data.error === 'string'
    ) {
      return new EventServiceError(e.response.data.error);
    } else if (e.response) {
      return new EventServiceError('Unknown API error occured');
    } else if (e.request) {
      return new EventServiceError(
        'The request was made but no response was received'
      );
    } else {
      return new EventServiceError(e.message);
    }
  }
}

// Util functions
export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getDayDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Event service API client
export async function getEvent(
  eventId: string,
  accessToken: string
): Promise<Event> {
  const apiUrl = getEnv().Hibiscus.Events.ApiUrl;

  try {
    const res = await axios(`${apiUrl}/events/${eventId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const event = res.data;
    event.startTime = new Date(event.startTime);
    event.endTime = new Date(event.endTime);
    return event;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw EventServiceError.handleAxiosError(e);
    } else {
      throw new EventServiceError();
    }
  }
}

export async function getAllEvents(accessToken: string): Promise<Event[]> {
  const apiUrl = getEnv().Hibiscus.Events.ApiUrl;

  // Display all events after Sep 1 2023
  const startDate = new Date(2023, 8, 1).toISOString();

  try {
    const res = await axios(`${apiUrl}/events?after=${startDate}&pageSize=-1`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const events = res.data.events;
    for (const e of events) {
      e.startTime = new Date(e.startTime);
      e.endTime = new Date(e.endTime);
    }
    return events;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw EventServiceError.handleAxiosError(e);
    } else {
      throw new EventServiceError();
    }
  }
}

export async function getPinnedEvents(
  userId: string,
  accessToken: string
): Promise<Event[]> {
  const apiUrl = getEnv().Hibiscus.Events.ApiUrl;

  try {
    const res = await axios(`${apiUrl}/pinned-events/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const events = res.data.pinnedEvents;
    for (const e of events) {
      e.startTime = new Date(e.startTime);
      e.endTime = new Date(e.endTime);
    }
    return events;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw EventServiceError.handleAxiosError(e);
    } else {
      throw new EventServiceError();
    }
  }
}

export async function pinEvent(
  userId: string,
  eventId: string,
  accessToken: string
): Promise<number> {
  const apiUrl = getEnv().Hibiscus.Events.ApiUrl;

  try {
    const res = await axios(`${apiUrl}/pinned-events/${userId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        pin_event: eventId,
      },
    });
    const pinned = res.data.pinned_event;
    return pinned;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw EventServiceError.handleAxiosError(e);
    } else {
      throw new EventServiceError();
    }
  }
}

export async function unpinEvent(
  userId: string,
  eventId: string,
  accessToken: string
): Promise<number> {
  const apiUrl = getEnv().Hibiscus.Events.ApiUrl;

  try {
    const res = await axios(`${apiUrl}/pinned-events/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        unpin_event: eventId,
      },
    });
    const unpinned = res.data.unpinned_event;
    return unpinned;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw EventServiceError.handleAxiosError(e);
    } else {
      throw new EventServiceError();
    }
  }
}

export async function updateEvent(
  eventId: string,
  props: Partial<Event>,
  accessToken: string
): Promise<Event> {
  const apiUrl = getEnv().Hibiscus.Events.ApiUrl;

  try {
    const res = await axios(`${apiUrl}/events/${eventId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        ...props,
      },
    });
    const event = res.data;
    return event;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw EventServiceError.handleAxiosError(e);
    } else {
      throw new EventServiceError();
    }
  }
}
