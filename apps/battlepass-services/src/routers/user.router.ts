import * as express from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controller/user.controller';

const router = express.Router();

router.get('/:user_id/points', async (req, res) =>
  container.resolve(UserController).getUserTotPoints(req, res)
);

router.get('/:user_id/bonus-points', async (req, res) => {
  container.resolve(UserController).getUserBonusPointStatuses(req, res);
});

router.get('/:user_id/:bonus_point/updateBonusPoints', async (req, res) =>
  container.resolve(UserController).updateBonusPoint(req, res)
);

export { router as UserRouter };
