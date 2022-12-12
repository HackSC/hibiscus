import { FormMetadata, FormQuestion } from '@hacksc-platforms/types';
import * as AWS from 'aws-sdk';
import { injectable } from 'tsyringe';

export interface HackformResponse {
  responses: {
    question: FormQuestion;
    textInput?: string; // for text-based questions
    multipleChoicesInput?: number[]; // indexes of the choices; if it's a single choice, size=1
    booleanInput?: boolean;
  }[];
}

@injectable()
export class HibiscusHackformClient {
  private readonly client: AWS.DynamoDB;
  constructor() {
    this.client = new AWS.DynamoDB({
      region: 'us-west-1', // by default N.Cal
    });
    // other variables will be set in environment
  }

  /**
   * Creates a hacker application submission
   * @param data a response object storing their submissions
   * @param formMetadata the original form metadata
   */
  async submitForm(data: HackformResponse, formMetadata: FormMetadata) {
    throw new Error('Not implemented');
  }
}
