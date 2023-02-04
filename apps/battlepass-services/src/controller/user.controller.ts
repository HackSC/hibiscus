import { injectable } from 'tsyringe';
import { User } from '../repository/user.repository';
import { Request, Response } from 'express';

@injectable()
export class UserController {
  constructor(private repository: User) {}
  /**
   * Get the points that a user has
   *
   * @param _req - incoming request (unused)
   * @param res - outgoing response { keys }
   */
  async getUserTotPoints(req, res) {
    try {
      const user = await this.repository.getPoints(req.params.user_id);
      if (user.error) throw user.error;
      const userData = user.data;
      const points = userData.at(0).bonus_points + userData.at(0).event_points;
      res.status(200).json({ points: points });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  async getUserBonusPointStatuses(req: Request, res: Response) {
    try {
      const statuses = await this.repository;
      res.status(200).json({});
    } catch (e) {
      res.status(400).json();
    }
  }

  async updateBonusPoints(req: Request, res: Response) {
    try {
      const;
    } catch (e) {}
  }

  async updateBonusPoint(req, res) {
    try {
      const points = await this.repository.getBonusPoints(req.param.user_id);
      if (points.error) throw points.error;
      const point = parseInt(points.data.toString()) + req.param.bonus_point;
      const updatePointsRes = await this.repository.updateBonusPoints(
        req.param.user_id,
        point
      );
      if (updatePointsRes.error) throw updatePointsRes.error;
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: -1, error: err });
    }
  }
}
