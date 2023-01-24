/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata';

import * as express from 'express';
import { LogController } from './controllers/log.controller';
import { container } from 'tsyringe';
import { LogRouter } from './routers/log.router';
import { KeyRouter } from './routers/key.router';

(async () => {
  const app = express();
  app.use(express.json());

  // Initialize controller and repository layer
  await container.resolve(LogController).initialize();

  app.use('/', LogRouter);
  app.use('/keys', KeyRouter);

  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/type/`);
  });
  server.on('error', console.error);
})();

// Handle cleanup on forced exit
[
  'SIGHUP',
  'SIGINT',
  'SIGQUIT',
  'SIGILL',
  'SIGTRAP',
  'SIGABRT',
  'SIGBUS',
  'SIGFPE',
  'SIGUSR1',
  'SIGSEGV',
  'SIGUSR2',
  'SIGTERM',
  'uncaughtException',
].forEach((e) => {
  process.on(e, async () => {
    await container.dispose();
    console.log('Gracefully shut down');
    process.exit();
  });
});
