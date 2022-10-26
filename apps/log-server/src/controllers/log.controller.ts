import * as express from 'express';
import { container, injectable } from 'tsyringe';
import { LogRepository } from '../repositories/log.repository';
import { status_code } from '../status-code';

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
   * create new log into database
   * @param req - incoming request
   * @param res - outgoing response
   */
  async createLog(req: express.Request, res: express.Response) {
    const userRepo = container.resolve(LogRepository);
    // schema validation step

    // call repo method
    const timeOfLogCreation = Date.now();
    try {
      await userRepo.insertLog(req.body.log, req.body.type, timeOfLogCreation);
      res.status(200).json({ message: 'New log added successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getLog(req: express.Request, res: express.Response) {
    const userRepo = container.resolve(LogRepository);

    res.send();
  }

  // async getHello(req: express.Request, res: express.Response) {
  //   const userRepo = container.resolve(UserRepository);
  //   const userid = await userRepo.getUsers('1');
  //   res.send('hello, ' + userid);
  // }
}

export default new LogController();
