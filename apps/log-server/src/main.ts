/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import LogController from './controllers/log.controller';

const app = express();
const router = express.Router();
app.use(express.json());
LogController.initialize();

router.post('/', LogController.createLog);
router.get('/', LogController.getLog);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
