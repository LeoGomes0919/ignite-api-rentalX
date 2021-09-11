import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const carRouter = Router();

carRouter.use('/categories', categoriesRoutes);
carRouter.use('/specifications', specificationsRoutes);

export { carRouter };
