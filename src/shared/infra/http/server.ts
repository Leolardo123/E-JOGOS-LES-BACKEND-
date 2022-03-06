import 'dotenv/config';
import 'reflect-metadata'

import express from 'express';
import cors from 'cors';
import http from 'http';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import routes from './routes';
import globalErrorHandling from './middleware/globalErrorHandling';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(routes);

app.use(globalErrorHandling)

server.listen(process.env.PORT || 3334, async () => {
  console.log(`🚀 Server started on port ${process.env.PORT || 3334}!`);
});
