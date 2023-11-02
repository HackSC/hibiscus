import { faker } from '@faker-js/faker';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { BonusPointsStatus } from './types';
import { container } from 'tsyringe';
import { BattlePassRepository } from 'apps/dashboard/repository/battlepass.repository';
import axios from 'axios';

const getNumberStatusBonusPoint = (status: BonusPointsStatus) => {
  switch (status) {
    case BonusPointsStatus.APPROVED:
      return 1;
    case BonusPointsStatus.PENDING:
      return 0;
    case BonusPointsStatus.REJECTED:
      return -1;
  }
};

const getBonusPointNumberStatus = (num: number) => {
  switch (num) {
    case 1:
      return BonusPointsStatus.APPROVED;
    case 0:
      return BonusPointsStatus.PENDING;
    case -1:
      return BonusPointsStatus.REJECTED;
  }
};

export interface BattlepassAPIInterface {
  getLeaderboard: (
    pageSize: number,
    pageNumber: number
  ) => Promise<{
    data: {
      page_number: number;
      page_count: number;
      leaderboard: {
        first_name: string;
        last_name: string;
        bonus_points: number;
        event_points: number;
        total_points: number;
      }[];
    };
  }>;
  getUserRankLeaderboard: (
    userId: string
  ) => Promise<{ data: { place: number } }>;
  getUserTotalPoints: (userId: string) => Promise<{ data: { points: number } }>;
  getBonusPointEventsUserStatus: (userId: string) => Promise<{
    data: {
      id: string;
      name: string;
      description: string;
      points: number;
      link: string;
      status: BonusPointsStatus;
    }[];
  }>;
  updateUserBonusPointStatus: (
    userId: string,
    bonusPointsId: string,
    status: BonusPointsStatus
  ) => Promise<void>;
}

export class BattlepassAPI implements BattlepassAPIInterface {
  private readonly client: SupabaseClient;
  constructor(private mock: boolean, hbc: HibiscusSupabaseClient) {
    this.client = hbc.getClient();
  }

  async getLeaderboard(
    pageSize: number,
    pageNum: number
  ): Promise<{
    data: {
      page_number: number;
      page_count: number;
      leaderboard: {
        first_name: string;
        last_name: string;
        bonus_points: number;
        event_points: number;
        total_points: number;
      }[];
    };
  }> {
    if (this.mock) {
      return {
        data: {
          page_number: pageNum,
          page_count: pageSize,
          leaderboard: Array.from(Array(pageSize).keys())
            .map(() => ({
              first_name: faker.name.firstName(),
              last_name: faker.name.lastName(),
              bonus_points: faker.datatype.number(),
              event_points: faker.datatype.number(),
              total_points: faker.datatype.number(),
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

    try {
      const res = await axios.get(
        `/api/battlepass/leaderboard?pageNumber=${pageNum}&pageSize=${pageSize}`
      );

      return res.data;
    } catch {
      throw new Error('Failed to fetch leaderboard');
    }
  }

  async getUserRankLeaderboard(
    userId: string
  ): Promise<{ data: { place: number } }> {
    if (this.mock) return { data: { place: faker.datatype.number() } };
    try {
      const res = await axios.get(`/api/battlepass/user-rank/${userId}`);

      return res.data;
    } catch {
      throw new Error('Failed to get user rank');
    }
  }

  async getBonusPointEventsUserStatus(userId: string): Promise<{
    data: {
      id: string;
      name: string;
      description: string;
      points: number;
      link: string;
      status: BonusPointsStatus;
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
        status: BonusPointsStatus.PENDING,
      },
      {
        name: 'Follow us on Facebook!',
        description: '',
        points: 25,
        id: faker.datatype.uuid(),
        created_at: faker.date.soon().toDateString(),
        link: faker.internet.url(),
        status: BonusPointsStatus.PENDING,
      },
      {
        name: 'Follow us on Twitter!',
        description: '',
        points: 25,
        id: faker.datatype.uuid(),
        created_at: faker.date.soon().toDateString(),
        link: faker.internet.url(),
        status: BonusPointsStatus.PENDING,
      },
      {
        name: 'Post on social media with the hashtag #hacksc23',
        description: '',
        points: 25,
        id: faker.datatype.uuid(),
        created_at: faker.date.soon().toDateString(),
        link: faker.internet.url(),
        status: BonusPointsStatus.PENDING,
      },
    ];
    if (this.mock) {
      return { data: BONUS_POINTS };
    }
    const resBPUserLog = await this.client
      .from('bonus_points_log')
      .select('bonus_points(id,name,description,points,link), status')
      .eq('user_id', userId);

    const bonusPointsRes = await this.client
      .from('bonus_points')
      .select('id,name,description,points,link');

    if (resBPUserLog.error) {
      throw resBPUserLog.error;
    }
    const copyBonusPoints = bonusPointsRes.data.map((item) => ({
      ...item,
      status: BonusPointsStatus.VERIFY,
    }));
    // go through each bonus points and check user log
    for (const [i, item] of bonusPointsRes.data.entries()) {
      const foundLogIndex = resBPUserLog.data.findIndex(
        (fnd) => (fnd.bonus_points as any).id === item.id
      );
      if (foundLogIndex !== -1) {
        copyBonusPoints[i]['status'] = getBonusPointNumberStatus(
          resBPUserLog.data[foundLogIndex].status
        );
      }
    }
    return {
      data: copyBonusPoints.map((item) => {
        return item;
      }),
    };
  }

  async updateUserBonusPointStatus(
    userId: string,
    bonusPointId: string,
    status: BonusPointsStatus
  ) {
    const getNumberStatusBonusPoint = (status: BonusPointsStatus) => {
      switch (status) {
        case BonusPointsStatus.APPROVED:
          return 1;
        case BonusPointsStatus.PENDING:
          return 0;
        case BonusPointsStatus.REJECTED:
          return -1;
      }
    };

    const res = await this.client.from('bonus_points_log').upsert({
      user_id: userId,
      bonus_points_id: bonusPointId,
      status: getNumberStatusBonusPoint(status),
    });
    if (res.error) throw res.error;
  }

  async getUserTotalPoints(
    userId: string
  ): Promise<{ data: { points: number } }> {
    if (this.mock) {
      return {
        data: { points: faker.datatype.number() },
      };
    }
    try {
      const res = await axios.get(`/api/battlepass/user-points/${userId}`);

      return res.data;
    } catch {
      throw new Error('Failed to get user rank');
    }
  }
}
