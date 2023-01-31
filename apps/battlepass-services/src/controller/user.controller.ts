import { injectable } from 'tsyringe';
import { User } from '../repository/user.repository';
import * as express from 'express';

@injectable()
export class UserController {
  constructor(private repository: User) {}
  /**
   * Get the points that a user has
   *
   * @param _req - incoming request (unused)
   * @param res - outgoing response { keys }
   */
  async getUser(req, res) {
    try {
      const user = await this.repository.getPoints(req.params.user_id);
      const userData = user.data;
      const points = userData.at(0).bonus_points + userData.at(0).event_points;
      res.status(200).json({ points: points });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateBonusPoint(req, res) {
    try {
      const points = await this.repository.getBonusPoints(req.param.user_id);
      const point = parseInt(points.data.toString()) + req.param.bonus_point;
      const user = await this.repository.updateBonusPoints(
        req.param.user_id,
        point
      );
    } catch (err) {
      res.status(500).json({ status: -1 });
    }
  }
}
