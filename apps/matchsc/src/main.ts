import * as express from 'express';
import { environment } from './environments';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to matchsc!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(
    `Listening at http://${environment.APP.HOST}:${environment.APP.PORT}/api`
  );
});
server.on('error', console.error);
