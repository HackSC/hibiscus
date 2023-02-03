export interface HackSCEvent {
  id: number;
  name: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  points: number;
  pinned?: boolean;
}
