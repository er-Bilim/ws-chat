import express from 'express';
import type { Express } from 'express';
import { PORT } from './constants/constants.ts';
import { createServer } from 'http';
import cors from 'cors';
import initWebsocket from './ws/chat/server.ts';
import mongoose from 'mongoose';
import config from './config.ts';

const app: Express = express();
const server = createServer(app);

initWebsocket(server);

app.use(cors());

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
