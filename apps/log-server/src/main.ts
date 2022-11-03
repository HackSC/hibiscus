/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata';

import * as express from 'express';
import { LogController } from './controllers/log.controller';
import { container } from 'tsyringe';

(async () => {
  const app = express();
  const router = express.Router();
  app.use(express.json());
  const logController = container.resolve(LogController);
  await logController.initialize();

  router.post('/', async (req, res) => {
    await logController.createLog(req, res);
  });
  router.get('/', async (req, res) => {
    await logController.getLog(req, res);
  });

  app.use(router);

  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
})();
