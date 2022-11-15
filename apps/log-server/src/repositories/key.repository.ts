import { injectable } from 'tsyringe';
import { MongoClient, WithId } from 'mongodb';

const DB_NAME = 'logserver';
const KEY_COLLECTION = 'key';

@injectable()
export class KeyRepository {
  private client: MongoClient;

  constructor() {
    const username = encodeURIComponent(process.env.MONGODB_USERNAME);
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
    const host = process.env.MONGODB_HOST;
    this.client = new MongoClient(`mongodb://${username}:${password}@${host}`);
  }

  /**
   * Returns all the keys stored in the database
   *
   * @returns Promise which resolves to an array of all the keys in the database
   */
  async getKeys(): Promise<WithId<Key>[]> {
    return this.client
      .db(DB_NAME)
      .collection<Key>(KEY_COLLECTION)
      .find()
      .toArray();
  }
}

/**
 * Schema of documents in the Key collection
 */
interface Key {
  key: string;
  name: string;
  description: string;
}
