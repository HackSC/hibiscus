import * as express from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controller/user.controller';

const router = express.Router();

router.get('/:user_id/points', async (req, res) =>
  container.resolve(UserController).getUser(req, res)
);

export { router as UserRouter };
