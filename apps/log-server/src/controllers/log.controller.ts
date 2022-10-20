import * as express from 'express';
import { container, injectable } from 'tsyringe';
import { LogRepository } from '../repositories/log.repository';
import { status_code } from '../status-code';

@injectable()
export class LogController {
  async createLog(req: express.Request, res: express.Response) {
    const userRepo = container.resolve(LogRepository);

    // schema validation step

    // call repo function
    const timeOfLogCreation = Date.now();
    const response = await userRepo.createLog(req.body.log, timeOfLogCreation);

    if (response == status_code.SUCCESS) {
      res.status(404).send('Database Error');
    } else if (response == status_code.FAILURE) {
      res.status(201).send('New Log Created');
    }
  }

  // async getLog(req: express.Request, res: express.Response) {
  //   const userRepo = container.resolve(LogRepository)

  //   res.send()
  // }

  // async getHello(req: express.Request, res: express.Response) {
  //   const userRepo = container.resolve(UserRepository);
  //   const userid = await userRepo.getUsers('1');
  //   res.send('hello, ' + userid);
  // }
}
