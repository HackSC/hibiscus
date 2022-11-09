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
    await userRepo.initDb();
  }

  /**
   * Create new log into database
   * @param req - incoming request (log, type)
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
      // Check if log is in format of corresponding schema
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { buildYup } = require('schema-to-yup');
      const schema = await userRepo.getSchema(type);
      const yupSchema = buildYup(schema);
      await yupSchema.validate(log);
      await userRepo.insertLog(log, type, timeOfLogCreation);
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
    const userRepo = container.resolve(LogRepository);
    // schema validation step

    // call repo method
    try {
      const type = req.query.type;
      const query = req.query.query;
      const sortMethod = req.query.sortMethod;
      const page = req.query.page;
      //const log = await userRepo.getLogs(type, query, sortMethod, page);
      //res.status(200).json(log);
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
    const userRepo = container.resolve(LogRepository);
    try {
      const type = req.body.type;
      const schema = req.body.schema;
      //Check if schema is valid
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { buildYup } = require('schema-to-yup');
      buildYup(schema);
      const log = await userRepo.insertSchema(type, schema);
      res.status(200).json(log);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new LogController();
