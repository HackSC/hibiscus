import { installPackagesTask } from '@nrwl/devkit';
import * as express from 'express';
import { container, injectable } from 'tsyringe';
import { LogRepository } from '../repositories/log.repository';

@injectable()
class LogController {
  /**
   * Setup constructor
   */
  async initialize() {
    const userRepo = container.resolve(LogRepository);
    await userRepo.initDB();
  }

  /**
   * Create new log into database
   * @param req - incoming request
   * @param res - outgoing response
   */
  async createLog(req: express.Request, res: express.Response) {
    const userRepo = container.resolve(LogRepository);
    // schema validation step

    // call repo method
    const timeOfLogCreation = Date.now();
    try {
      const log = req.body.log;
      const type = req.body.type;
      await userRepo.insertLog(log, type, timeOfLogCreation);
      res.status(200).json({ message: 'New log added successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  /**
   * Retrieve logs based on input parameter
   * @param req incoming request
   * @param res outgoing response (list of logs)
   */
  async getLog(req: express.Request, res: express.Response) {
    const userRepo = container.resolve(LogRepository);
    // schema validation step

    // call repo method
    try {
      const type = req.body.log;
      const query = req.body.query;
      const sortMethod = req.body.sortMethod;
      const page = req.body.page;
      const log = await userRepo.getLogs(type, query, sortMethod, page);
      res.status(200).json(log);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new LogController();
