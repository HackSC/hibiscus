/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata';

import * as express from 'express';
import { LeaderboardRouter } from './routers/leaderboard.router';
import { BonusPointsRouter } from './routers/bonusPoints.router';
import * as path from 'path';

const app = express();
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to battlepass-services!' });
});

app.use('/leaderboard', LeaderboardRouter);
app.use('/events', BonusPointsRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
