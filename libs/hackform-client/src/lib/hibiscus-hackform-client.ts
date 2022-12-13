import { FormMetadata, HackformResponse } from '@hacksc-platforms/types';
import {
  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { injectable } from 'tsyringe';

@injectable()
export class HibiscusHackformClient {
  private readonly ddb: DynamoDBClient;
  private readonly tableName: string = 'hacker-app-responses'; // table name in the database

  constructor() {
    this.ddb = new DynamoDBClient({
      region: 'us-west-1', // by default N.Cal
    });
    // other variables will be set in environment
  }

  private buildDDBItemFromResponse(
    data: HackformResponse
  ): PutItemCommandInput['Item'] {
    return {
      data: {
        L: {},
      },
    };
  }

  /**
   * Creates a hacker application submission
   * @param data a response object storing their submissions
   * @param formMetadata the original form metadata
   */
  async submitForm(data: HackformResponse, formMetadata: FormMetadata) {
    const cmd = new PutItemCommand({
      TableName: this.tableName,
      Item: {
        data: {},
      },
    });
  }
}
