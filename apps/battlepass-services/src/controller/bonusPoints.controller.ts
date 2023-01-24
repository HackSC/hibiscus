import { injectable } from 'tsyringe';
import { BonusPoints } from '../repository/bonusPoints.repository';
import * as express from 'express';

@injectable()
export class BonusPointsController {
  constructor(private repository: BonusPoints) {}
  /**
   * Get bonus point events
   *
   * @param _req - incoming request (unused)
   * @param res - outgoing response { keys }
   */
  async getBonusPointEvents(_req: express.Request, res: express.Response) {
    try {
      const bonusPoints = await this.repository.getBonusPointEvents();
      res.status(200).json({ bonusPoints });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
