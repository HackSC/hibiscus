/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';

export const createApp = () => {
  const app = express();

  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to test-app!' });
  });

  return app;
};
