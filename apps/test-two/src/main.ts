/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

export const app = () => {
  const server = express();
  server.get('/api', (req, res) => {
    res.send({ message: 'Welcome to testtest!' });
  });
  return server;
};
