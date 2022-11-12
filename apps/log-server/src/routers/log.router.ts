import * as express from 'express';
import { container } from 'tsyringe';
import { LogController } from '../controllers/log.controller';

const router = express.Router();

// Create a log under this type
router.post('/log', async (req, res) => {
  await container.resolve(LogController).createLog(req, res);
});

// Get logs under this type
router.get('/log', async (req, res) => {
  await container.resolve(LogController).getLog(req, res);
});

// Create a type schema
router.post('/type', async (req, res) => {
  await container.resolve(LogController).createSchema(req, res);
});

export { router as LogRouter };
