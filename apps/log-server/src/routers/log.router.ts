import * as express from 'express';
import { container } from 'tsyringe';
import { LogController } from '../controllers/log.controller';

const router = express.Router();

router.post('/', async (req, res) => {
  await container.resolve(LogController).createLog(req, res);
});

router.get('/', async (req, res) => {
  await container.resolve(LogController).getLog(req, res);
});

export { router as LogRouter };
