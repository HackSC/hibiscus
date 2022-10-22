import { injectable } from 'tsyringe';
import { MeiliSearch, MeiliSearchApiError } from 'meilisearch';
import {
  InvalidSchemaTypeError,
  SchemaNotFoundError,
  UnknownRepositoryError,
} from './repository.error';

const INDEX_LOG = 'log';
const INDEX_SCHEMA = 'schema';
const LIMIT = 20;

@injectable()
export class LogRepository {
  private client: MeiliSearch;

  constructor() {
    this.client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_MASTER_KEY,
    });
  }

  /**
   * Sets MeiliSearch settings
   * To be run once at server startup
   */
  async initDb() {
    // Set up indices
    const indexLog = await this.client.index(INDEX_LOG).getRawInfo();
    if (indexLog.primaryKey === undefined) {
      await this.client.updateIndex(INDEX_LOG, { primaryKey: '_id' });
    }

    const indexSchema = await this.client.index(INDEX_SCHEMA).getRawInfo();
    if (indexSchema.primaryKey === undefined) {
      await this.client.updateIndex(INDEX_SCHEMA, { primaryKey: 'type' });
    }

    // Make type filterable
    await this.client.index(INDEX_LOG).updateFilterableAttributes(['_type']);

    // Make time sortable
    await this.client.index(INDEX_LOG).updateSortableAttributes(['_time']);
  }

  /**
   * Inserts a log into the database with the given timestamp
   *
   * @param log - the log object to be inserted into the database
   * @param type - the type of log that is inserted
   * @param time - UNIX timestamp
   *
   * @throws {UnknownRepositoryError} unknown error occured
   */
  async insertLog(log: Log, type: string, time: number) {
    // Generate primary key
    const id = crypto.randomUUID();

    try {
      await this.client
        .index(INDEX_LOG)
        .addDocuments([{ _id: id, _type: type, _time: time, ...log }]);
    } catch (e) {
      throw new UnknownRepositoryError(e);
    }
  }

  /**
   * Returns a list of logs which match the filter criteria given, optionally sorted by a specified method
   *
   * @param options.type - the type of log to be queried
   * @param options.query - the search query. If this is not passed, all documents in the index are returned
   * @param options.sortMethod - the method used to sort the returned logs e.g. 'time:desc'
   * @param options.page - the page number of returned results. Default 1
   *
   * @returns Promise object which resolves to a list of matching logs
   */
  async getLogs({
    type,
    query,
    sortMethod,
    page = 1,
  }: {
    type?: string;
    query?: string;
    sortMethod?: string;
    page?: number;
  }): Promise<any[]> {
    // Set up filters
    const filter = type !== undefined ? `type = ${type}` : '';

    // Set up sorting
    const sort = sortMethod !== undefined ? [sortMethod] : [];

    // Returns documents that match query, or placeholder search if query is not given
    const res = await this.client.index(INDEX_LOG).search(query, {
      filter,
      sort,
      offset: LIMIT * (page - 1),
      limit: LIMIT,
    });
    return res.hits;
  }

  /**
   * Inserts a schema which defines the given type of log into the database
   *
   * @param type - the unique identifier of the schema
   * @param schema - the schema object
   *
   * @throws {InvalidSchemaTypeError} schema type provided is invalid
   * @throws {UnknownRepositoryError} unknown error occured
   */
  async insertSchema(type: string, schema: Schema) {
    try {
      await this.client.index(INDEX_SCHEMA).addDocuments([{ type, schema }]);
    } catch (e) {
      if (e instanceof MeiliSearchApiError) {
        if (e.code === 'invalid_document_id') {
          throw new InvalidSchemaTypeError(type);
        }
      }
      // else
      throw new UnknownRepositoryError(e);
    }
  }

  /**
   * Returns the schema object associated with the given type of logs
   *
   * @param type - the unique identifier of the schema
   *
   * @throws {SchemaNotFoundError} no schema is found for the requested type
   * @throws {UnknownRepositoryError} unknown error occured
   */
  async getSchema(type: string): Promise<Schema> {
    try {
      const schema = await this.client.index(INDEX_SCHEMA).getDocument(type);
      return schema;
    } catch (e) {
      if (e instanceof MeiliSearchApiError) {
        if (e.code === 'document_not_found') {
          return new SchemaNotFoundError(type);
        }
      }
      // else
      return new UnknownRepositoryError(e);
    }
  }
}

type Schema = Record<string, any>;
type Log = Record<string, any>;
