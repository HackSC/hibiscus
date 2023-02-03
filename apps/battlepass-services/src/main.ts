import 'reflect-metadata';
import * as dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
