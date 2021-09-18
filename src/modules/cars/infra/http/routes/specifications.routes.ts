import { Router } from 'express';

import { ensureAuthenticated } from '../../../../accounts/infra/http/middlewares/ensureAuthenticated';
import { CreateSpecificationsController } from '../controllers/specifications/CreateSpecificationsController';
import { ListSpecificationsController } from '../controllers/specifications/ListSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationsController();
const listSpecificationController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

specificationsRoutes.get('/', listSpecificationController.handle);

export { specificationsRoutes };
