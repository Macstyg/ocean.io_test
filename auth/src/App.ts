import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import CurrentUserRouter from './routes/UserRouter';
import ProtectedRoute from './routes/ProtectedRoute';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/NotFoundError';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app
      .set('trust proxy', true)
      .use(json())
      .use(
        cookieSession({
          signed: false,
          secure: true,
        }),
      );
  }

  private routes(): void {
    this.app
      .use('/api/users', CurrentUserRouter)
      .use('/api/protected', ProtectedRoute)
      .get('*', async (req, res, next) => {
        throw new NotFoundError();
      })
      .use(errorHandler);
  }
}

export default new App().app;
