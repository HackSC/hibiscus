import * as express from 'express';
import { injectable } from 'tsyringe';
import { LogRepository } from '../repositories/log.repository';

@injectable()
export class LogController {
  /**
   * Setup constructor
   */
  constructor(private userRepo: LogRepository) {
    this.userRepo = userRepo;
  }

  async initialize() {
    await this.userRepo.initDb();
  }

  /**
   * Create new log into database
   * @param req - incoming request (log, type)
   * @param res - outgoing response
   */
  async createLog(req: express.Request, res: express.Response) {
    // schema validation step

    // call repo method
    const timeOfLogCreation = Date.now();
    try {
      const log = req.body.log;
      const type = req.params.type;
      await this.userRepo.insertLog(log, type, timeOfLogCreation);
      res.status(200).json({ message: 'New log added successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  /**
   * Retrieve logs based on input parameter
   * @param req incoming request (type, query, sortMethod, page)
   * @param res outgoing response (list of logs)
   */
  async getLog(req: express.Request, res: express.Response) {
    // schema validation step

    // call repo method
    try {
      const type = req.params.type;
      const query = req.body.query;
      const sortMethod = req.body.sortMethod;
      const page = req.body.page;
      const log = await this.userRepo.getLogs({
        type,
        query,
        sortMethod,
        page,
      });
      res.status(200).json(log);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  /**
   * Create a schema that defines the given type of log into the database
   * @param req incoming request (type, schema)
   * @param res outgoing request
   */
  async createSchema(req: express.Request, res: express.Response) {
    try {
      const type = req.body.type;
      const schema = req.body.schema;
      const log = await this.userRepo.insertSchema(type, schema);
      res.status(200).json(log);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
