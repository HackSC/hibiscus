import { singleton } from 'tsyringe';
import { getEnv } from '@hibiscus/env';
import { MongoClient } from 'mongodb';

@singleton()
export class HibiscusMongoClient {
  private readonly mongo: MongoClient;
  constructor() {
    this.mongo = new MongoClient(getEnv().Hibiscus.FeatureFlag.MongoURI);
  }

  getClient() {
    return this.mongo;
  }
}
