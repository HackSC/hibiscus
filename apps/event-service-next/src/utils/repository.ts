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
    rsvps: data.pinned_events.length,
    capacity: data.capacity,
    organizerDetails: data.organizer_details,
    contactInfo: data.contact_info,
  } as EventAdmin;
}

async function getEvents(
  page: number = null,
  page_size: number = null,
  date?: Date,
  after?: Date,
  name?: string,
  location?: string
) {
  return -1;
}

async function addEvent(event: EventAdmin) {
  // TODO: Test this
  const { data: event_id, error } = await client
    .from('events')
    .insert(event)
    .select('event_id');
  if (error) throw new Error(error.message);
  if (event.eventTags) {
    const { error } = await client.from('event_tags').insert(event.eventTags);
    if (error) throw new Error(error.message);
  }
  if (event.industryTags) {
    const { error } = await client
      .from('industry_tags')
      .insert(event.industryTags);
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
  industry_tags?: string[]
) {
  //TODO: Add kwargs
  return -1;
}

async function deleteEvent(event_id: string) {
  const { error } = await client
    .from('events')
    .delete()
    .eq('event_id', event_id);
  if (error) throw new Error(error.message);
}

async function getPinnedEvents(user_id: string) {
  return -1;
}

async function addPinnedEvent(user_id: string, event_id: string) {
  return -1;
}

async function removePinnedEvent(user_id: string, event_id: string) {
  return -1;
}

async function getRSVPUsers(event_id: string) {
  return -1;
}

async function addEventTag(event_id: string, event_tag: string) {
  return -1;
}

async function removeEventTag(event_id: string, event_tag: string) {
  return -1;
}

async function addIndustryTag(event_id: string, industry_tag: string) {
  return -1;
}

async function removeIndustryTag(event_id: string, industry_tag: string) {
  return -1;
}

async function addContact(
  event_id: string,
  name: string,
  role?: string,
  phone?: string,
  email?: string
) {
  return -1;
}

async function removeContact(contact_id: string) {
  return -1;
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
  addIndustryTag,
  removeIndustryTag,
  addContact,
  removeContact,
};
