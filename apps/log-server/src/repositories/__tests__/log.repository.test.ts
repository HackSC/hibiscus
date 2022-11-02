import 'reflect-metadata';

import { jest, describe, it } from '@jest/globals';
import {
  Index,
  MeiliSearch,
  SearchResponse,
  type Task,
  TaskStatus,
  TaskTypes,
  MeiliSearchApiError,
} from 'meilisearch';
import { LogRepository } from '../log.repository';
import { container } from 'tsyringe';
import { SchemaNotFoundError } from '../repository.error';

// Failed task object
const mockFailedTask: Task = {
  status: TaskStatus.TASK_FAILED,
  type: TaskTypes.DOCUMENTS_ADDITION_OR_UPDATE,
  enqueuedAt: '',
  uid: -1,
  batchUid: -1,
  details: {
    rankingRules: null,
    searchableAttributes: null,
    displayedAttributes: null,
    filterableAttributes: null,
    sortableAttributes: null,
    stopWords: null,
    synonyms: null,
    distinctAttribute: null,
  },
  duration: '',
  startedAt: '',
  finishedAt: '',
};

// Set up mocks
const mockCreateIndex = jest
  .spyOn(MeiliSearch.prototype, 'createIndex')
  .mockImplementation(async () => {
    return {
      taskUid: -1,
      status: TaskStatus.TASK_ENQUEUED,
      type: TaskTypes.INDEX_CREATION,
      enqueuedAt: '',
    };
  });

const mockUpdateFilterableAttributes = jest
  .spyOn(Index.prototype, 'updateFilterableAttributes')
  .mockImplementation(async () => {
    return {
      taskUid: -1,
      status: TaskStatus.TASK_ENQUEUED,
      type: TaskTypes.INDEX_UPDATE,
      enqueuedAt: '',
    };
  });

const mockUpdateSortableAttributes = jest
  .spyOn(Index.prototype, 'updateSortableAttributes')
  .mockImplementation(async () => {
    return {
      taskUid: -1,
      status: TaskStatus.TASK_ENQUEUED,
      type: TaskTypes.INDEX_UPDATE,
      enqueuedAt: '',
    };
  });

const mockWaitForTask = jest
  .spyOn(MeiliSearch.prototype, 'waitForTask')
  .mockImplementation(async () => {
    return {
      status: TaskStatus.TASK_SUCCEEDED,
      type: TaskTypes.DOCUMENTS_ADDITION_OR_UPDATE,
      enqueuedAt: '',
      uid: -1,
      batchUid: -1,
      details: {
        rankingRules: null,
        searchableAttributes: null,
        displayedAttributes: null,
        filterableAttributes: null,
        sortableAttributes: null,
        stopWords: null,
        synonyms: null,
        distinctAttribute: null,
      },
      duration: '',
      startedAt: '',
      finishedAt: '',
    };
  });

const mockAddDocuments = jest
  .spyOn(Index.prototype, 'addDocuments')
  .mockImplementation(async () => {
    return {
      taskUid: -1,
      status: TaskStatus.TASK_ENQUEUED,
      type: TaskTypes.DOCUMENTS_ADDITION_OR_UPDATE,
      enqueuedAt: '',
    };
  });

const mockSearch = jest
  .spyOn(Index.prototype, 'search')
  .mockImplementation(async () => {
    return {
      hits: [{ testKey: 'test1' }],
      offset: -1,
      limit: -1,
      processingTimeMs: -1,
      query: '',
      estimatedTotalHits: -1,
    } as SearchResponse;
  });

const mockGetDocument = jest
  .spyOn(Index.prototype, 'getDocument')
  .mockImplementation(async () => {
    return {
      type: 'testType',
      schema: {
        testKey: 'testValue',
      },
    };
  });

describe('LogRepository', () => {
  let logRepository: LogRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    logRepository = container.resolve(LogRepository);
    await logRepository.initDb();
  });

  describe('initDb', () => {
    it('should create the Log index and set primary key', () => {
      expect(mockCreateIndex).toHaveBeenCalledWith('log', {
        primaryKey: '_id',
      });
    });

    it('should create the Schema index and set primary key', () => {
      expect(mockCreateIndex).toHaveBeenCalledWith('schema', {
        primaryKey: 'type',
      });
    });

    it('should set the Log index to be filterable by type', () => {
      expect(mockUpdateFilterableAttributes).toHaveBeenCalledWith(['_type']);
    });

    it('should set the Log index to be sortable by timestamp', () => {
      expect(mockUpdateSortableAttributes).toHaveBeenCalledWith(['_time']);
    });
  });

  describe('insertLog', () => {
    it('should insert the log into database', async () => {
      await logRepository.insertLog({ test: 'test' }, 'test', 0);
      expect(mockAddDocuments.mock.calls[0][0]).toEqual([
        expect.objectContaining({
          _id: expect.any(String),
          _type: expect.any(String),
          _time: expect.any(Number),
          test: 'test',
        }),
      ]);
    });

    it('should throw error if insertion fails', async () => {
      mockWaitForTask.mockImplementationOnce(async () => {
        return mockFailedTask;
      });
      await expect(
        logRepository.insertLog({ test: 'test' }, 'test', 0)
      ).rejects.toThrow();
    });
  });

  describe('getLogs', () => {
    it('should return the array of results', async () => {
      const logs = await logRepository.getLogs({});
      expect(logs).toEqual([{ testKey: 'test1' }]);
    });

    it('should search with query if query is provided', async () => {
      await logRepository.getLogs({ query: 'testQuery' });
      expect(mockSearch).toHaveBeenCalledWith('testQuery', expect.anything());
    });

    it('should filter by type of log if type is provided', async () => {
      await logRepository.getLogs({ type: 'testType' });
      expect(mockSearch.mock.calls[0][1]).toHaveProperty(
        'filter',
        "_type = 'testType'"
      );
    });

    it('should sort if sort method is provided', async () => {
      await logRepository.getLogs({ sortMethod: 'test:asc' });
      expect(mockSearch.mock.calls[0][1]).toHaveProperty('sort', ['test:asc']);
    });

    it('should query for the requested page', async () => {
      const page = 3;
      await logRepository.getLogs({ page });
      const { limit, offset } = mockSearch.mock.calls[0][1];
      expect(limit).toBeDefined();
      expect(offset).toBe(limit * (page - 1));
    });
  });

  describe('insertSchema', () => {
    it('should insert the schema into the database', async () => {
      await logRepository.insertSchema('testSchema', { testKey: 'testValue' });
      expect(mockAddDocuments.mock.calls[0][0]).toEqual([
        expect.objectContaining({
          type: 'testSchema',
          schema: { testKey: 'testValue' },
        }),
      ]);
    });

    it('should throw error if insertion fails', async () => {
      mockWaitForTask.mockImplementationOnce(async () => {
        return mockFailedTask;
      });
      await expect(
        logRepository.insertSchema('test schema', { testKey: 'testValue' })
      ).rejects.toThrow();
    });
  });

  describe('getSchema', () => {
    it('should search for the requested type of schema', async () => {
      await logRepository.getSchema('testType');
      expect(mockGetDocument).toHaveBeenCalledWith('testType');
    });

    it('should return the requested schema', async () => {
      const schema = await logRepository.getSchema('testType');
      expect(schema).toEqual({ testKey: 'testValue' });
    });

    it('should throw SchemaNotFoundError when the requested schema does not exist', async () => {
      mockGetDocument.mockImplementationOnce(async () => {
        throw new MeiliSearchApiError(
          { code: 'document_not_found', link: '', message: '', type: '' },
          404
        );
      });
      await expect(logRepository.getSchema('testType')).rejects.toThrowError(
        SchemaNotFoundError
      );
    });
  });
});
