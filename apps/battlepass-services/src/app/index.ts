import 'reflect-metadata';

import * as express from 'express';
import { LeaderboardRouter } from '../routers/leaderboard.router';
import { BonusPointsRouter } from '../routers/bonusPoints.router';
import { UserRouter } from '../routers/user.router';
import * as path from 'path';
import * as cors from 'cors';
import * as morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('combined'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to battlepass-services!' });
});

app.use('/leaderboard', LeaderboardRouter);
app.use('/bonus-points', BonusPointsRouter);
app.use('/user', UserRouter);

export default app;
