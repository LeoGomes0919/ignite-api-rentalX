import { Router } from 'express';
import { carRouter } from '../modules/cars/infra/http/routes/index.routes';

const routes = Router();

routes.use(carRouter);

export { routes };
