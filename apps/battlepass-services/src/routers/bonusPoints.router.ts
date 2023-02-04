import * as express from 'express';
import { container } from 'tsyringe';
import { BonusPointsController } from '../controller/bonusPoints.controller';

const router = express.Router();

router.get('/', async (req, res) =>
  container.resolve(BonusPointsController).getBonusPointEvents(req, res)
);

export { router as BonusPointsRouter };
