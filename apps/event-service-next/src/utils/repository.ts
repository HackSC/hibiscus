import { createClient } from '@supabase/supabase-js';
import { getEnv } from '@hibiscus/env';

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
  return data;
}
async function getEventAdmin(event_id: string) {
  return -1;
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

async function addEvent(event: any) {
  return -1;
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
  return -1;
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
