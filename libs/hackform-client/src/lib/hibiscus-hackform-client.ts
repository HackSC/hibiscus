import {
  FormMetadata,
  FormQuestionType,
  HackformSubmission,
} from '@hibiscus/types';
import {
  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { injectable } from 'tsyringe';
import { v4 } from 'uuid';

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
    data: HackformSubmission,
    hackformMetadata: FormMetadata
  ): PutItemCommandInput['Item'] {
    const responseId = v4();
    return {
      id: { S: responseId },
      data: {
        L: <AttributeValue[]>hackformMetadata.questions.map((question, qi) => {
          const { input } = data.responses[qi];
          switch (question.type) {
            case FormQuestionType.ShortText:
            case FormQuestionType.Email:
            case FormQuestionType.LongText:
              return { S: input.text };
            case FormQuestionType.Boolean:
              return { BOOL: input.boolean };
            case FormQuestionType.Number:
              return { N: input.number };
            case FormQuestionType.SingleOptionDropdown:
              return {
                M: {
                  DisplayName: { S: input.text },
                  Value: { S: input.singleChoiceValue },
                },
              };
            case FormQuestionType.Date:
              return { D: input.text };
            default:
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
  async submitForm(data: HackformSubmission, formMetadata: FormMetadata) {
    return this.ddb.send(
      new PutItemCommand({
        TableName: this.tableName,
        Item: this.buildDDBItemFromResponse(data, formMetadata),
      })
    );
  }
}
