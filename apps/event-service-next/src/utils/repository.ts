import { createClient } from '@supabase/supabase-js';
import { getEnv } from '@hibiscus/env';
import type { Event, EventAdmin } from '../utils/types.d.ts';

const apiUrl = getEnv().Hibiscus.Supabase.apiUrl;
const serviceKey = getEnv().Hibiscus.Supabase.serviceKey;

const client = createClient(apiUrl, serviceKey, { db: { schema: 'events' } });

async function getEvent(event_id: string) {
  const { data, error } = await client
    .from('events')
    .select(
      'event_id, name, start_time, end_time, location, description, event_tags (*), industry_tags (*), bp_points'
    )
    .eq('event_id', event_id)
    .single();
  if (error) throw new Error(error.message);

  return {
    eventId: data.event_id,
    eventName: data.name,
    startTime: data.start_time,
    endTime: data.end_time,
    location: data.location,
    description: data.description,
    eventTags: data.event_tags,
    industryTags: data.industry_tags,
    bpPoints: data.bp_points,
  } as Event;
}

async function getEventAdmin(event_id: string) {
  const { data, error } = await client
    .from('events')
    .select('*, event_tags (*), industry_tags (*), pinned_events (*)')
    .eq('event_id', event_id)
    .single();
  if (error) throw new Error(error.message);

  return {
    eventId: data.event_id,
    eventName: data.name,
    startTime: data.start_time,
    endTime: data.end_time,
    location: data.location,
    description: data.description,
    eventTags: data.event_tags,
    industryTags: data.industry_tags,
    bpPoints: data.bp_points,
    rsvps: data.pinned_events ? data.pinned_events.length : 0,
    capacity: data.capacity,
    organizerDetails: data.organizer_details,
    contactInfo: data.contact_info,
  } as EventAdmin;
}

async function getEvents(
  page: number = null,
  page_size: number = null,
  name?: string,
  location?: string,
  date?: Date,
  after?: Date
) {
  let query = client
    .from('events')
    .select(
      'event_id, name, start_time, end_time, location, description, event_tags (*), industry_tags (*), bp_points'
    );
  if (name) {
    query = query
      .ilike('name', `%${name}%`)
      .order('name', { ascending: false });
  }
  if (location) {
    query = query
      .ilike('location', `%${location}%`)
      .order('location', { ascending: false });
  }
  if (date) {
    const day = 60 * 60 * 24 * 1000;
    query = query
      .gte('end_time', date.toISOString())
      .lte('start_time', new Date(date.getTime() + day).toISOString());
  }
  if (after !== undefined) {
    query = query.gte('end_time', after.toISOString());
  }

  query.order('start_time', { ascending: false });

  if (page_size >= 0) {
    query.range((page - 1) * page_size, page * page_size);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const events = data.map((event) => {
    return {
      eventId: event.event_id,
      eventName: event.name,
      startTime: event.start_time,
      endTime: event.end_time,
      location: event.location,
      description: event.description,
      eventTags: event.event_tags,
      industryTags: event.industry_tags,
      bpPoints: event.bp_points,
    } as Event;
  });

  return events;
}

async function addEvent(
  event: any,
  event_tags?: string[],
  industry_tags?: string[]
) {
  const {
    data: { event_id },
    error,
  } = await client.from('events').insert(event).select('event_id').single();
  if (error) throw new Error(error.message);
  if (event_tags) {
    const { error } = await client
      .from('event_tags')
      .insert(event_tags.map((event_tag) => ({ event_id, event_tag })));
    if (error) throw new Error(error.message);
  }
  if (industry_tags) {
    const { error } = await client
      .from('industry_tags')
      .insert(
        industry_tags.map((industry_tag) => ({ event_id, industry_tag }))
      );
    if (error) throw new Error(error.message);
  }
  if (event.contactInfo) {
    const { error } = await client
      .from('contact_info')
      .insert(event.contactInfo);
    if (error) throw new Error(error.message);
  }
  return event_id;
}

async function updateEvent(
  event_id: string,
  event_tags?: string[],
  industry_tags?: string[],
  eventValues?: object
) {
  let event;
  if (Object.keys(eventValues).length > 0) {
    const { data, error } = await client
      .from('events')
      .update(eventValues)
      .eq('event_id', event_id)
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    event = data;
  } else {
    const { data, error } = await client
      .from('events')
      .select('*, event_tags (*), industry_tags (*), pinned_events (*)')
      .eq('event_id', event_id)
      .single();
    if (error) throw new Error(error.message);
    event = data;
  }
  if (event_tags) {
    // Delete event_tags
    await client.from('event_tags').delete().eq('event_id', event_id);
    // Insert event_tags
    const { error } = await client
      .from('event_tags')
      .insert(event_tags.map((event_tag) => ({ event_id, event_tag })));
    if (error) throw new Error(error.message);
  }
  if (industry_tags) {
    // Delete industry_tags
    await client.from('industry_tags').delete().eq('event_id', event_id);
    // Insert industry_tags
    const { error } = await client
      .from('industry_tags')
      .insert(
        industry_tags.map((industry_tag) => ({ event_id, industry_tag }))
      );
    if (error) throw new Error(error.message);
  }
  return {
    eventId: event.event_id,
    eventName: event.name,
    startTime: event.start_time,
    endTime: event.end_time,
    location: event.location,
    description: event.description,
    eventTags: event_tags ? event_tags : event.event_tags,
    industryTags: industry_tags ? industry_tags : event.industry_tags,
    bpPoints: event.bp_points,
    rsvps: event.pinned_events ? event.pinned_events.length : 0,
    capacity: event.capacity,
    organizerDetails: event.organizer_details,
    contactInfo: event.contact_info,
  } as EventAdmin;
}

async function deleteEvent(event_id: string) {
  const { error } = await client
    .from('events')
    .delete()
    .eq('event_id', event_id);
  if (error) throw new Error(error.message);
}

async function getPinnedEvents(user_id: string) {
  //TODO: Fix ordering
  const { data, error } = await client
    .from('pinned_events')
    .select('events (*)')
    .eq('user_id', user_id)
    .order('start_time', { foreignTable: 'events', ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

async function addPinnedEvent(user_id: string, event_id: string) {
  const { error } = await client
    .from('pinned_events')
    .insert({ user_id, event_id });
  if (error) throw new Error(error.message);
}

async function removePinnedEvent(user_id: string, event_id: string) {
  const { error } = await client
    .from('pinned_events')
    .delete()
    .eq('user_id', user_id)
    .eq('event_id', event_id);
  if (error) throw new Error(error.message);
}

async function getRSVPUsers(event_id: string) {
  const { data, error } = await client
    .from('pinned_events')
    .select('user_id')
    .eq('event_id', event_id);
  if (error) throw new Error(error.message);
  return data as unknown as string[];
}

async function addEventTag(event_id: string, event_tag: string) {
  const { error } = await client
    .from('event_tags')
    .insert({ event_id, event_tag });
  if (error) throw new Error(error.message);
}

async function removeEventTag(event_id: string, event_tag: string) {
  const { error } = await client
    .from('event_tags')
    .delete()
    .eq('event_id', event_id)
    .eq('event_tag', event_tag);
  if (error) throw new Error(error.message);
}

export {
  getEvent,
  getEventAdmin,
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getPinnedEvents,
  addPinnedEvent,
  removePinnedEvent,
  getRSVPUsers,
  addEventTag,
  removeEventTag,
};
