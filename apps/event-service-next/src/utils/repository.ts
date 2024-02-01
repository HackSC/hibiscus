function getEvent(event_id: string) {
  return -1;
}

function getEventAdmin(event_id: string) {
  return -1;
}

function getEvents(
  page: number = null,
  page_size: number = null,
  date?: Date,
  after?: Date,
  name?: string,
  location?: string
) {
  return -1;
}

function addEvent(event: any) {
  return -1;
}

function updateEvent(
  event_id: string,
  event_tags?: string[],
  industry_tags?: string[]
) {
  //TODO: Add kwargs
  return -1;
}

function deleteEvent(event_id: string) {
  return -1;
}

function getPinnedEvents(user_id: string) {
  return -1;
}

function addPinnedEvent(user_id: string, event_id: string) {
  return -1;
}

function removePinnedEvent(user_id: string, event_id: string) {
  return -1;
}

function getRSVPUsers(event_id: string) {
  return -1;
}

function addEventTag(event_id: string, event_tag: string) {
  return -1;
}

function removeEventTag(event_id: string, event_tag: string) {
  return -1;
}

function addIndustryTag(event_id: string, industry_tag: string) {
  return -1;
}

function removeIndustryTag(event_id: string, industry_tag: string) {
  return -1;
}

function addContact(
  event_id: string,
  name: string,
  role?: string,
  phone?: string,
  email?: string
) {
  return -1;
}

function removeContact(contact_id: string) {
  return -1;
}

const repository = {
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

export default repository;
