import { Router } from 'express';
import multer from 'multer';
import { UpdateUserAvatarController } from '../controllers/UpdateUserAvatarController';

import { CreateUsersControllers } from '../controllers/CreateUsersControllers';
import uploadConfig from '../../../../../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const accountsRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUsersControllers();
const updateUserAvatarController = new UpdateUserAvatarController();

accountsRoutes.post('/', createUserController.handle);

accountsRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export { accountsRoutes };
