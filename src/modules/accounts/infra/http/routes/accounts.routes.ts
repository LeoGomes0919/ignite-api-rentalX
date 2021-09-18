import { Router } from 'express';

import { CreateUsersControllers } from '../controllers/CreateUsersControllers';

const accountsRoutes = Router();

const createUserController = new CreateUsersControllers();

accountsRoutes.post('/', createUserController.handle);

export { accountsRoutes };
