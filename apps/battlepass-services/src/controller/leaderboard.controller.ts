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
      let pageNum = parseInt(req.param.page_number);
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
      list.sort();
      const user = await this.repository.getUser(_req.params.user_id);
      const rank = list.indexOf(user);
      res.status(200).json({ place: rank });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
