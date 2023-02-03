import { faker } from '@faker-js/faker';
import { getEnv } from '@hibiscus/env';
import axios from 'axios';

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
  private readonly serverUrl = getEnv().Hibiscus.Battlepass.ApiUrl;
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
                b.bonus_points +
                b.event_points -
                (a.bonus_points + a.event_points)
            ),
        },
      };
    }
    const res = await axios.get(
      `${this.serverUrl}/leaderboard/${pageNumber}/${pageSize}`
    );
    console.log(res.data);
    return res.data;
  }

  async getUserRankLeaderboard(
    userId: string
  ): Promise<{ data: { place: number } }> {
    if (this.mock) return { data: { place: faker.datatype.number() } };
    const res = await axios.get(`${this.serverUrl}/user/${userId}/rank`);
    return res.data;
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
    const BONUS_POINTS = [
      {
        name: 'Follow us on Instagram!',
        description: '',
        points: 25,
        id: faker.datatype.uuid(),
        created_at: faker.date.soon().toDateString(),
        link: faker.internet.url(),
      },
      {
        name: 'Follow us on Facebook!',
        description: '',
        points: 25,
        id: faker.datatype.uuid(),
        created_at: faker.date.soon().toDateString(),
        link: faker.internet.url(),
      },
      {
        name: 'Follow us on Twitter!',
        description: '',
        points: 25,
        id: faker.datatype.uuid(),
        created_at: faker.date.soon().toDateString(),
        link: faker.internet.url(),
      },
      {
        name: 'Post on social media with the hashtag #hacksc23',
        description: '',
        points: 25,
        id: faker.datatype.uuid(),
        created_at: faker.date.soon().toDateString(),
        link: faker.internet.url(),
      },
    ];
    if (this.mock) {
      return { data: BONUS_POINTS };
      // return {
      //   data: Array.from(Array(5).keys()).map(() => ({
      //     id: faker.datatype.uuid(),
      //     name: faker.lorem.words(5),
      //     description: faker.lorem.lines(5),
      //     created_at: faker.date.soon().toDateString(),
      //     points: faker.datatype.number(),
      //     link: faker.internet.url(),
      //   })),
      // };
    }
    return { data: [] };
  }

  async getUserTotalPoints(
    userId: string
  ): Promise<{ data: { points: number } }> {
    if (this.mock) {
      return {
        data: { points: faker.datatype.number() },
      };
    }
    const res = await axios.get(`${this.serverUrl}/user/${userId}/points`);
    return res.data;
  }
}
