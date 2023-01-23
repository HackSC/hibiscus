import { injectable } from 'tsyringe';
import * as express from 'express';
import { Leaderboard } from '../repository/leaderboard.repository';

@injectable()
export class LeaderboardController {
  constructor(private repository: Leaderboard) {}
  /**
   * Get sorted leaderboard
   *
   * @param _req - incoming request (unused)
   * @param res - outgoing response { keys }
   */
  async getLeaderboard(_req: express.Request, res: express.Response) {
    try {
      const leaderboard = await this.repository.getLeaderboard();
      res.status(200).json({ leaderboard });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
