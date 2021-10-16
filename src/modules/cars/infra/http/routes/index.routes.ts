import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { carsRoutes } from './cars.routes';

const carRouter = Router();

carRouter.use('/categories', categoriesRoutes);
carRouter.use('/specifications', specificationsRoutes);
carRouter.use('/cars', carsRoutes);

export { carRouter };
