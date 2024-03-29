import { injectable } from 'tsyringe';
import { KeyRepository } from '../repositories/key.repository';
import * as express from 'express';

@injectable()
export class KeyController {
  constructor(private repository: KeyRepository) {}

  /**
   * Gets all the keys stored in the database
   *
   * @param _req - incoming request (unused)
   * @param res - outgoing response { keys }
   */
  async getAllKeys(_req: express.Request, res: express.Response) {
    try {
      const keys = await this.repository.getKeys();
      res.status(200).json({ keys });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  /**
   * Deletes a key stored in database
   *
   * @param _req - incoming request { key }
   * @param res - outgoing response
   */
  async deleteKey(_req: express.Request, res: express.Response) {
    try {
      await this.repository.deleteKeys(_req.body.key);
      res.status(200);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
