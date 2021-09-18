import { Router } from 'express';
import { accountRouter } from '../modules/accounts/infra/http/routes/index.routes';
import { carRouter } from '../modules/cars/infra/http/routes/index.routes';

const routes = Router();

routes.use(carRouter);
routes.use(accountRouter);

export { routes };
