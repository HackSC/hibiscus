import { injectable } from 'tsyringe';
import { getEnv } from '@hibiscus/env';
import { MongoClient } from 'mongodb';

@injectable()
export class FeatureFlagRepository {
  private readonly mongo: MongoClient;
  constructor() {
    this.mongo = new MongoClient(getEnv().Hibiscus.FeatureFlag.MongoURI);
  }

  async getAll(): Promise<Record<string, boolean>> {
    const client = await this.mongo.connect();
    const vals = {};
    await client
      .db('hibiscus')
      .collection('feature-flags')
      .find()
      .forEach((item) => {
        vals[item['key']] = item['value'];
      });
    return vals;
  }
}
