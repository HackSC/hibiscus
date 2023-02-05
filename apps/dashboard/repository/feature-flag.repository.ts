import { injectable } from 'tsyringe';
import { MongoClient } from 'mongodb';
import { HibiscusMongoClient } from './mongo.client';

@injectable()
export class FeatureFlagRepository {
  private readonly mongo: MongoClient;
  constructor(readonly hibiscusMongoClient: HibiscusMongoClient) {
    this.mongo = hibiscusMongoClient.getClient();
  }

  async getAll(): Promise<Record<string, boolean>> {
    const vals = {};
    await this.mongo
      .db('hibiscus')
      .collection('feature-flags')
      .find()
      .forEach((item) => {
        vals[item['key']] = item['value'];
      });
    return vals;
  }
}
