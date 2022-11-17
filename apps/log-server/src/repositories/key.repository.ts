import { Disposable, singleton } from 'tsyringe';
import { MongoClient, ObjectId, WithId } from 'mongodb';
import { handleRepositoryErrors } from './repository.error';

const DB_NAME = process.env.KEY_REPO_DB_NAME;
const COLLECTION_KEY = process.env.KEY_REPO_COLLECTION_KEY;

@singleton()
export class KeyRepository implements Disposable {
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
      .collection<Key>(COLLECTION_KEY)
      .find()
      .toArray();
  }

  /**
   * Deletes a specific key stored in the database
   *
   * @param key - the id of the key to be deleted
   */
  async deleteKeys(key: string) {
    try {
      this.client
        .db(DB_NAME)
        .collection<Key>(COLLECTION_KEY)
        .deleteOne({ _id: new ObjectId(key) });
    } catch (e) {
      handleRepositoryErrors(e);
    }
  }

  /**
   * Called when container.dispose is called
   * Closes the client connection
   */
  async dispose() {
    await this.client.close();
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
