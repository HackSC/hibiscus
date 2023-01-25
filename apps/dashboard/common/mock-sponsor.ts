import { faker } from '@faker-js/faker';

export type Attendee = {
  id: string;
  first_name: string;
  last_name: string;
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
        data: Array.from(Array(5).keys()).map(() => ({
          id: faker.datatype.uuid(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          major: faker.name.firstName(),
          resume: faker.name.firstName(),
          graduation_year: faker.name.firstName(),
          portfolio_link: faker.name.firstName(),
        })),
      };
    }
    // TODO: implement for real API

    return null;
  }
}
