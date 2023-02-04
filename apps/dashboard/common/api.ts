import 'reflect-metadata';
import { HackformSubmission } from '@hibiscus/types';
import axios from 'axios';
import { LocalAPIResponses } from './types';
import mime from 'mime-types';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';

// a service wrapping over our API requests (intended for client-side usage ONLY
// since some interacts with Supabase on the client)
export default class APIService {
  static createFileKey(file: File): string {
    const sfn = file.name.split('.');
    const defext = mime.extension(file.type);
    const name = sfn[0];
    return `${name}-${new Date().valueOf()}.${defext}`;
  }

  /**
   * Submits resume to file storage. Uses a `UUID` for name by default
   *
   * @param file File object
   * @returns data from API response
   */
  static async submitResume(file: File, key: string, hackerId: string) {
    // prelim check if hacker has already submitted
    const supabase = container.resolve(HibiscusSupabaseClient);
    const {
      data: { applied },
      error,
    } = await supabase.userApplied(hackerId);
    if (error) {
      console.error(error);
      return null;
    }
    if (applied) {
      console.error("Hacker already submitted form => can't submit resume");
      return null;
    }
    const form = new FormData();
    form.append('file', file);
    form.append('key', key);
    const res = await axios.post('/api/resume', form);
    const { meta, filepath } = res.data as LocalAPIResponses['/resume'];
    return { key, filepath: filepath, meta };
  }

  /**
   * Submits data for hacker application
   * Also updates apps for the current user
   *
   * @param submission HackformSubmission
   * @param hackerId hacker ID
   * @returns whatever it returns; if hacker already submitted an app before, returns null
   */
  static async submitHackform(
    hackerId: string,
    submission: HackformSubmission
  ) {
    // check if user already submitted and abort submission if so
    const supabase = container.resolve(HibiscusSupabaseClient);
    const env = getEnv();
    const user = await supabase.getUserProfile(
      getCookie(env.Hibiscus.Cookies.accessTokenName) as string,
      getCookie(env.Hibiscus.Cookies.refreshTokenName) as string
    );
    if (user.application_status === 3 || user.app_id !== null) {
      return null;
    }

    // submits the form
    const res = await axios.post('/api/hackform', { submission });
    const data = res.data as LocalAPIResponses['/hackform'];

    // assoc current hacker with this form
    const err = await supabase.updateUserProfile(hackerId, {
      app_id: data.formId,
    });
    if (err) {
      throw err;
    }
    return { formId: data.formId, data: res.data };
  }

  static async getHackformSubmission(id: string) {
    const res = await axios.get(`/api/hackform?id=${id}`);
    return res.data;
  }

  static async getSchools(): Promise<string[]> {
    const res = await axios.get('/api/schools');
    return res.data as string[];
  }
}

type TeamServiceResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  error?: { message: string };
  status: string | number;
};

export class TeamServiceAPI {
  static async acceptInvite(inviteId: string): Promise<TeamServiceResponse> {
    const res = await axios.put(
      `/api/invite/accept?inviteId=${inviteId}`,
      {},
      {
        validateStatus: (status) => {
          return status >= 200 && status <= 503;
        },
      }
    );
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async rejectInvite(inviteId: string): Promise<TeamServiceResponse> {
    const res = await axios.put('/api/invite/reject', { inviteId });
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async createTeam(
    name: string,
    description: string,
    organizerId: string
  ) {
    const res = await axios.post('/api/organizer/create', {
      name,
      description,
      organizerId,
    });
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async teamInviteUser(organizerId: string, inviteeEmail: string) {
    const { data, status } = await axios.post(
      '/api/organizer/invite',
      {
        organizerId,
        email: inviteeEmail,
      },
      {
        validateStatus: (status) => {
          return status >= 200 && status <= 503;
        },
      }
    );
    if (status >= 400) {
      return { error: { message: data.message }, status };
    }
    return {
      data: {
        inviteId: data.data.inviteId,
        createdAt: data.data.createdAt,
        invitee: {
          id: data.data.invitee.id,
          firstName: data.data.invitee.firstName,
          lastName: data.data.invitee.lastName,
          email: data.data.invitee.email,
        },
      },
      status,
    };
  }

  static async getTeamById(teamId: string) {
    const res = await axios.get(`/api/team?teamId=${teamId}`);
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async kickUser(kickId: string) {
    const res = await axios.put('/api/organizer/kick', { kickId });
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }

  static async removeInvite(inviteId: string) {
    // TODO
  }
}

// -- SponsorServiceAPI -- //
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

  static async getCompanyProfile(companyId: string) {
    const res = await axios.get(`/api/company/${companyId}`);
    if (res.status >= 400) {
      return { error: { message: res.data.message }, status: res.status };
    }
    return { data: res.data, status: res.status };
  }
}
