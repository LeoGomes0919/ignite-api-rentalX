import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateRentalController } from '../controllers/CreateRentalController';
import { DevolutionRentalController } from '../controllers/DevolutionRentalController';
import { ListRentalByUserController } from '../controllers/ListRentalByUserController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.put(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);
rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalByUserController.handle,
);

export { rentalsRoutes };
