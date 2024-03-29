import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { injectable } from 'tsyringe';
import { credentials, region } from './aws';

@injectable()
export class HackformResumeUploadClient {
  private readonly s3: S3Client;
  private readonly bucket = '2023-hacker-resumes';

  constructor() {
    this.s3 = new S3Client({
      region,
      credentials,
    });
  }

  /**
   * Upload hacker resume file with given key
   * @param buf bytes Buffer object data representing the hacker resume's upload
   * @param key identifier for this resume file (must be unique)
   * @returns status code from the operation, attempts taken, and request ID
   * to the ext service
   */
  async uploadResume(
    buf: Buffer,
    key: string
  ): Promise<{ httpStatusCode: number; attempts: number; requestId: string }> {
    const { $metadata } = await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buf,
      })
    );
    return {
      httpStatusCode: $metadata.httpStatusCode,
      attempts: $metadata.attempts,
      requestId: $metadata.requestId,
    };
  }

  async getResumeMetadata(key: string) {
    const result = await this.s3.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );
    return result.$metadata;
  }

  async getResumePresignedUrl(key: string): Promise<string | null> {
    return '';
  }
}
