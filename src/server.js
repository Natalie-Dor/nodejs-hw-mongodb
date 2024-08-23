import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import authRouters from './routers/auth.js';
import contactRouters from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(cookieParser());
  //   app.use(express.json());
  app.use(pino());
  app.use(cors());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(authRouters);
  app.use(contactRouters);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
