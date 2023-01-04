import { HackformSubmission } from '@hibiscus/types';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { credentials } from './credentials';

@injectable()
export class HackformSubmissionDataClient {
  private readonly ddb: DynamoDBClient;
  private readonly tableName: string = 'hacker-app-responses'; // table name in the database
  private readonly awsRegion: string = 'us-west-1';

  constructor() {
    this.ddb = new DynamoDBClient({
      region: this.awsRegion,
      credentials,
    });
    // other variables will be set in environment
  }

  /**
   * Creates a hacker application submission
   * @param data a response object storing their submissions
   * @param formMetadata the original form metadata
   */
  async submitForm(data: HackformSubmission) {
    const cmd = new PutItemCommand({
      TableName: this.tableName,
      Item: this.buildDDBItemFromResponse(data),
    });
    return this.ddb.send(cmd);
  }

  /**
   * Get a certain Hackform submission
   * @param id response ID
   * @returns item
   */
  async getHackformSubmission(id: string): Promise<HackformSubmission> {
    const cmd = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    });
    const { Item } = await this.ddb.send(cmd);
    if (!Item) return null;
    const res = unmarshall(Item);
    return res as HackformSubmission;
  }

  private buildDDBItemFromResponse(
    data: HackformSubmission
  ): PutItemCommandInput['Item'] {
    const id = v4();
    const json = {
      id,
      data: data,
    };
    return marshall(json, { removeUndefinedValues: true });
  }
}
