import { faker } from '@faker-js/faker';

export class BattlepassAPI {
  constructor(private mock: boolean) {}

  async getLeaderboard(
    pageSize: number,
    pageNumber: number
  ): Promise<{
    page_number: number;
    page_count: number;
    leaderboard: {
      user_id: string;
      first_name: string;
      last_name: string;
      bonus_points: number;
      event_points: number;
    }[];
  }> {
    if (this.mock) {
      return {
        page_number: pageNumber,
        page_count: pageSize,
        leaderboard: Array.from(Array(pageSize).keys())
          .map(() => ({
            user_id: faker.datatype.uuid(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            bonus_points: faker.datatype.number(),
            event_points: faker.datatype.number(),
          }))
          .sort(
            (a, b) =>
              a.bonus_points +
              a.event_points -
              (b.bonus_points + b.event_points)
          ),
      };
    }
    return null;
  }
}
