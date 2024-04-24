interface EventTag {
  event_tag: string;
}

interface IndustryTag {
  industry_tag: string;
}

export interface Event {
  eventId: string;
  eventName: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;
  eventTags: EventTag[];
  industryTags: IndustryTag[];
  bpPoints: number;
}

interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface EventAdmin extends Event {
  rsvps: number;
  capacity: number;
  organizerDetails: string;
  contactInfo: Contact[];
}
