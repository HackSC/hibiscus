import * as express from 'express';
import { container } from 'tsyringe';
import { LeaderboardController } from '../controller/leaderboard.controller';

const router = express.Router();

router.get('', async (req, res) =>
  container.resolve(LeaderboardController).getLeaderboard(req, res)
);

export { router as LeaderboardRouter };
