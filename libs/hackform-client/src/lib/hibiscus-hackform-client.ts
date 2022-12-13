import {
  FormMetadata,
  FormQuestionType,
  HackformResponse,
} from '@hacksc-platforms/types';
import {
  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import * as AWS from 'aws-sdk';
import { injectable } from 'tsyringe';

@injectable()
export class HibiscusHackformClient {
  private readonly ddb: DynamoDBClient;
  private readonly tableName: string = 'hacker-app-responses'; // table name in the database
  private readonly awsRegion: string = 'us-west-1';

  constructor() {
    this.ddb = new DynamoDBClient({ region: this.awsRegion });
    // other variables will be set in environment
  }

  private buildDDBItemFromResponse(
    data: HackformResponse
  ): PutItemCommandInput['Item'] {
    return {
      id: { S: '1' },
      data: {
        L: <AttributeValue[]>data.responses.map((item) => {
          if (
            item.question.type === FormQuestionType.ShortText ||
            item.question.type === FormQuestionType.LongText ||
            item.question.type === FormQuestionType.Email
          ) {
            return { S: item.textInput };
          } else if (item.question.type === FormQuestionType.Number) {
            return { N: item.numberInput };
          } else {
            return { N: null };
          }
        }),
      },
    };
  }

  /**
   * Creates a hacker application submission
   * @param data a response object storing their submissions
   * @param formMetadata the original form metadata
   */
  async submitForm(data: HackformResponse, formMetadata: FormMetadata) {
    return this.ddb.send(
      new PutItemCommand({
        TableName: this.tableName,
        Item: this.buildDDBItemFromResponse(data),
      })
    );
  }
}
