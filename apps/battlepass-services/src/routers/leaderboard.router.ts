import * as express from 'express';
import { container } from 'tsyringe';
import { LeaderboardController } from '../controller/leaderboard.controller';

const router = express.Router();

router.get('/leaderboard', async (req, res) =>
  container.resolve(LeaderboardController).getLeaderboard(req, res)
);

router.get('/leaderboard/rank', async (req, res) =>
  container.resolve(LeaderboardController).getRank(req, res)
);

export { router as LeaderboardRouter };
