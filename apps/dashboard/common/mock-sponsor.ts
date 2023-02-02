import { faker } from '@faker-js/faker';
import { SponsorServiceAPI } from './api';

export type Attendee = {
  id: string;
  full_name: string;
  school: string;
  major: string;
  resume: string; //WILL BE CHANGED SOON, STRING FOR NOW
  graduation_year: string;
  portfolio_link: string;
};

export interface SponsorAPIInterface {
  getAttendees: () => Promise<{ data: Attendee[] }>;
}

export class SponsorAPI implements SponsorAPIInterface {
  constructor(private mock: boolean) {}

  async getAttendees(): Promise<{ data: Attendee[] }> {
    const COMPANY_ID = '70f7dcf9-d0d9-493f-b8b4-be986a92adb3'; // Will change later
    const EVENT_ID = '1'; // Will change later
    const apiResponse = (
      await SponsorServiceAPI.getCheckInAttendee(COMPANY_ID, EVENT_ID)
    ).data;
    return apiResponse;

    // if (this.mock) {
    //   return {
    //     data: Array.from(Array(10).keys()).map(() => ({
    //       id: faker.datatype.uuid(),
    //       first_name: faker.name.firstName(),
    //       last_name: faker.name.lastName(),
    //       school: faker.company.name(),
    //       major: faker.name.jobTitle(),
    //       resume: faker.name.jobDescriptor(),
    //       graduation_year: faker.name.jobArea(),
    //       portfolio_link: faker.name.firstName(),
    //     })),
    //   };
    // }
    return null;
  }
}
