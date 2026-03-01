import express from 'express';
import authRouter from './routes/auth.route.js';
import teamRouter from './routes/team.route.js';
import channelRouter from './routes/channel.route.js';
import { configDotenv } from 'dotenv';

const app = express();

configDotenv(); 

app.use(express.json());
app.use('/', (req, res) => res.send('Collaboration Platform API is running'));
app.use('/api/auth', authRouter);
app.use('/api/teams', teamRouter);
app.use('/api/channels', channelRouter);

export default app;