import { injectable } from 'tsyringe';
import { Leaderboard } from '../repository/leaderboard.repository';
import * as express from 'express';

@injectable()
export class BonusPointsController {
  constructor(private repository: Leaderboard) {}
  /**
   * Get bonus point events
   *
   * @param _req - incoming request (unused)
   * @param res - outgoing response { keys }
   */
  async getBonusPointEvents(_req: express.Request, res: express.Response) {
    try {
      const user = await this.repository.getUser(_req.params.user_id);
      const userData = user.data;
      res.status(200).json({ user: userData });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
