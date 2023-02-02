import { injectable } from 'tsyringe';
import { Redis } from 'ioredis';
import { getEnv } from '@hibiscus/env';

@injectable()
export class FeatureFlagRepository {
  private readonly redis: Redis;
  constructor() {
    this.redis = new Redis(getEnv().Hibiscus.FeatureFlag.RedisURL);
  }

  async getAll(): Promise<Record<string, boolean>> {
    const keys = await this.redis.keys('*');
    const vals = {};
    for (const key of keys) {
      const val = await this.redis.get(key);
      vals[key] = val === 'true';
    }
    return vals;
  }
}
