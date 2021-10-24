import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import swaggerFile from '../../../swagger.json';
import { routes } from './routes/index.routes';

import createConnection from '../typeorm';
import '@shared/container';

createConnection();
const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    error: 'error',
    message: 'Internal Server error',
  });
});

export { app };
