export type Event = {
  eventId: number;
  eventName: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description?: string;
  eventTags?: string[];
  industryTags?: string[];
  bpPoints: number;
};
