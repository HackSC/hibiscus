import { faker } from '@faker-js/faker';

export interface BattlepassAPIInterface {
  getLeaderboard: (
    pageSize: number,
    pageNumber: number
  ) => Promise<{
    data: {
      page_number: number;
      page_count: number;
      leaderboard: {
        user_id: string;
        first_name: string;
        last_name: string;
        bonus_points: number;
        event_points: number;
      }[];
    };
  }>;
  getUserRankLeaderboard: (
    userId: string
  ) => Promise<{ data: { place: number } }>;
  getUserTotalPoints: (userId: string) => Promise<{ data: { points: number } }>;
  getBonusPointEvents: () => Promise<{
    data: {
      id: string;
      name: string;
      description: string;
      created_at: string;
      points: number;
      link: string;
    }[];
  }>;
}

export class BattlepassAPI implements BattlepassAPIInterface {
  constructor(private mock: boolean) {}

  async getLeaderboard(
    pageSize: number,
    pageNumber: number
  ): Promise<{
    data: {
      page_number: number;
      page_count: number;
      leaderboard: {
        user_id: string;
        first_name: string;
        last_name: string;
        bonus_points: number;
        event_points: number;
      }[];
    };
  }> {
    if (this.mock) {
      return {
        data: {
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
        },
      };
    }
    // TODO: implement for real API
    return null;
  }

  async getUserRankLeaderboard(
    userId: string
  ): Promise<{ data: { place: number } }> {
    if (this.mock) return { data: { place: faker.datatype.number() } };
    return null;
  }

  async getBonusPointEvents(): Promise<{
    data: {
      id: string;
      name: string;
      description: string;
      created_at: string;
      points: number;
      link: string;
    }[];
  }> {
    if (this.mock) {
      return {
        data: Array.from(Array(5).keys()).map(() => ({
          id: faker.datatype.uuid(),
          name: faker.lorem.words(5),
          description: faker.lorem.lines(5),
          created_at: faker.date.soon().toDateString(),
          points: faker.datatype.number(),
          link: faker.internet.url(),
        })),
      };
    }
    return null;
  }

  async getUserTotalPoints(
    userId: string
  ): Promise<{ data: { points: number } }> {
    if (this.mock) {
      return {
        data: { points: faker.datatype.number() },
      };
    }
    return null;
  }
}
