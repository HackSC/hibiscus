import { faker } from '@faker-js/faker';

export type Attendee = {
  id: string;
  first_name: string;
  last_name: string;
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
    if (this.mock) {
      return {
        data: Array.from(Array(10).keys()).map(() => ({
          id: faker.datatype.uuid(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          school: faker.company.name(),
          major: faker.name.jobTitle(),
          resume: faker.name.jobDescriptor(),
          graduation_year: faker.name.jobArea(),
          portfolio_link: faker.name.firstName(),
        })),
      };
    }
    // TODO: implement for real API

    return null;
  }
}
