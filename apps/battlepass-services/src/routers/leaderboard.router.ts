import * as express from 'express';
import { container } from 'tsyringe';
import { LeaderboardController } from '../controller/leaderboard.controller';

const router = express.Router();

router.get('/:page_number([0-9]+)/:number_per_page', async (req, res) => {
  container.resolve(LeaderboardController).getLeaderboard(req, res);
});

router.get('/:user_id/rank', async (req, res) =>
  container.resolve(LeaderboardController).getRank(req, res)
);

export { router as LeaderboardRouter };
