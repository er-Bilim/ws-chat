import dotenv from 'dotenv';
import express from 'express';
import type { Express, Request, Response } from 'express';
import { PORT } from './constants/constants.ts';
import { createServer } from 'http';
import cors from 'cors';
import initWebsocket from './ws/chat/server.ts';
import mongoose from 'mongoose';
import config from './config.ts';
import apiRoute from './routes/api.route.ts';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();
const server = createServer(app);

initWebsocket(server);

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use('/api', apiRoute);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

const run = async () => {
  await mongoose.connect(config.db);

  server.listen(PORT, () => {
    console.log(`Server is running in port: http://localhost:${PORT}`);
    console.log(`WS chat is running in port: ws://localhost:${PORT}/chat`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((error) => console.error(error));
