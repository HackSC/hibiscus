import axios from 'axios';

// -- EventServiceAPI -- //
type EventServiceResponse = {
  data?: any;
  error?: { message: string };
  status: string | number;
};

export type Event = {
  description: string | null;
  end: string;
  id: number;
  location: string;
  name: string;
  points: number;
  start: string;
};

export class EventServiceAPI {
  static async getEvents(): Promise<EventServiceResponse> {
    const res = await axios.get(`https://b82hadam4l.execute-api.us-west-1.amazonaws.com/prod/events`);
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }
}
