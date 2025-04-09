import axios from 'axios';

type SponsorServiceResponse = {
  data?: any;
  error?: { message: string };
  status: string | number;
};

export class SponsorServiceAPI {
  static async getCheckInAttendee(
    companyId: string,
    eventId: string
  ): Promise<SponsorServiceResponse> {
    const res = await axios.get(`/api/company/${companyId}/${eventId}`);
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async getFilteredAttendee(
    companyId: string,
    eventId: string,
    major?: string,
    year?: string,
    school?: string,
    saved?: boolean,
    limit?: number
  ) {
    const res = await axios.post(`/api/company/${companyId}/${eventId}`, {
      year,
      major,
      school,
      saved,
      limit,
    });
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async saveAttendee(companyId: string, attendeeId: string) {
    const res = await axios.post(
      `/api/company/${companyId}/save/${attendeeId}`
    );
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async unsaveAttendee(companyId: string, attendeeId: string) {
    const res = await axios.delete(
      `/api/company/${companyId}/save/${attendeeId}`
    );
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async getAttendeeNote(companyId: string, attendeeId: string) {
    const res = await axios.get(
      `/api/notes?company_id=${companyId}&participant_id=${attendeeId}`
    );
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async setAttendeeNote(
    companyId: string,
    attendeeId: string,
    note: string
  ) {
    const res = await axios.put(
      `/api/notes?company_id=${companyId}&participant_id=${attendeeId}`,
      { note }
    );
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async getCompanyIdAndEventId(userId: string) {
    const res = await axios.get(`/api/companies/${userId}`);
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }
}
