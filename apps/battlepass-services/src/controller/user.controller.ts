import { injectable } from 'tsyringe';
import { Leaderboard } from '../repository/leaderboard.repository';
import * as express from 'express';

@injectable()
export class UserController {
  constructor(private repository: Leaderboard) {}
  /**
   * Get bonus point events
   *
   * @param _req - incoming request (unused)
   * @param res - outgoing response { keys }
   */
  async getUser(req, res) {
    try {
      const user = await this.repository.getUser(req.params.user_id);
      const userData = user.data;
      res.status(200).json({ points: userData });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
