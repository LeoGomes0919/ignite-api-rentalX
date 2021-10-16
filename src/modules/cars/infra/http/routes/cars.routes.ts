import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { CreateCarsCrontoller } from '../controllers/cars/CreateCarsController';
import { ListAvailableCarsController } from '../controllers/cars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarsCrontoller();
const listAvailableCarController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarController.handle);

export { carsRoutes };
