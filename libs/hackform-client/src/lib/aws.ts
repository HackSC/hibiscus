import { getEnv } from '@hibiscus/env';

const {
  Hibiscus: { AWS },
} = getEnv();

export const credentials = {
  accessKeyId: AWS.accessKeyID,
  secretAccessKey: AWS.secretAccessKey,
};

export const region = AWS.region;
