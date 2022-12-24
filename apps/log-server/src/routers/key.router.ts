import * as express from 'express';
import { container } from 'tsyringe';
import { KeyController } from '../controllers/key.controller';

const router = express.Router();

router.get('', async (req, res) =>
  container.resolve(KeyController).getAllKeys(req, res)
);

export { router as KeyRouter };
