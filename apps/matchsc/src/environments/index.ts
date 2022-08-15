import * as env from 'dotenv';

const ALLOWED_NODE_ENVS = new Set(['development', 'production', 'test']);

if (process.env.NODE_ENV && !ALLOWED_NODE_ENVS.has(process.env.NODE_ENV)) {
  throw new Error(
    `Invalid NODE_ENV=${process.env.NODE_ENV}. Must be one of ${ALLOWED_NODE_ENVS}`
  );
}

// load the default environment config file
env.config();

export const environment = {
  APP: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
  },
};
