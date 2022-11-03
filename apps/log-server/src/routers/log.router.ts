import * as express from 'express';
import { container } from 'tsyringe';
import { LogController } from '../controllers/log.controller';

const router = express.Router();

router.post('/:type/log', async (req, res) => {
  await container.resolve(LogController).createLog(req, res);
});

router.get('/:type/log', async (req, res) => {
  await container.resolve(LogController).getLog(req, res);
});

export { router as LogRouter };
