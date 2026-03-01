import express from 'express';
import authRouter from '../../Smart Pickk/backend/src/routes/auth.route';
import teamRouter from '../../Smart Pickk/backend/src/routes/team.route';
import channelRouter from '../../Smart Pickk/backend/src/routes/channel.route';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/teams', teamRouter);
app.use('/api/channels', channelRouter);

export default app;