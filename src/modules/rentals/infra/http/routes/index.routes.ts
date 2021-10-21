import { Router } from 'express';
import { rentalsRoutes } from './rentals.routes';

const rentalRouter = Router();

rentalRouter.use('/rentals', rentalsRoutes);

export { rentalRouter };
