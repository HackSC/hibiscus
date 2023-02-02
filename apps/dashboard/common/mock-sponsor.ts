import { faker } from '@faker-js/faker';
import { SponsorServiceAPI } from './api';

export type Attendee = {
  id: string;
  full_name: string;
  school: string;
  major: string;
  resume?: string; //WILL BE CHANGED SOON, STRING FOR NOW
  graduation_year: string;
  portfolio_link?: string;
  quickNotes?: string | null;
};

export interface SponsorAPIInterface {
  getAttendees: (
    companyId?: string,
    eventId?: string
  ) => Promise<{ data: Attendee[] }>;
}

export class SponsorAPI implements SponsorAPIInterface {
  constructor(private mock: boolean) {}

  async getAttendees(
    companyId?: string,
    eventId?: string
  ): Promise<{ data: Attendee[] }> {
    if (this.mock) {
      return {
        data: Array.from(Array(10).keys()).map(() => ({
          id: faker.datatype.uuid(),
          full_name: faker.name.firstName(),
          school: faker.company.name(),
          major: faker.name.jobTitle(),
          resume: faker.name.jobDescriptor(),
          graduation_year: faker.name.jobArea(),
          portfolio_link: faker.name.firstName(),
          quickNotes: faker.name.firstName(),
        })),
      };
    }

    const apiResponse = (
      await SponsorServiceAPI.getCheckInAttendee(companyId, eventId)
    ).data;
    return apiResponse;
  }
}
