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
  async getLeaderboard(req, res) {
    try {
      const leaderboard = await this.repository.getLeaderboard();
      const response = leaderboard.data;
      response.sort();
      const pageSize = req.params.number_per_page;
      const pageCount = Math.ceil(response.length / pageSize);
      let pageNum = parseInt(req.params.page_number);
      if (pageNum < 1) pageNum = 1;
      if (pageNum > pageCount) pageNum = pageCount;
      //split into pages
      res.status(200).json({
        page_number: pageNum,
        page_count: pageCount,
        ranking: response.slice(
          pageNum * pageSize - pageSize,
          pageNum * pageSize
        ),
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getRank(_req: express.Request, res: express.Response) {
    try {
      const leaderboard = await this.repository.getLeaderboard();
      const list = leaderboard.data;
      // Sort leaderboard in descending order of points
      list.sort(
        (a, b) =>
          b.bonus_points + b.event_points - (a.bonus_points + a.event_points)
      );
      const rank =
        list.findIndex((user) => user.user_id === _req.params.user_id) + 1;
      if (rank === 0) {
        throw new Error('Error: User not found in leaderboard!');
      }
      res.status(200).json({ place: rank });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
