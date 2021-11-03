import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ResetPasswordUserController } from '../controllers/ResetPasswordUserController';
import { UpdateUserAvatarController } from '../controllers/UpdateUserAvatarController';

import { CreateUsersControllers } from '../controllers/CreateUsersControllers';
import { SendForgotPasswordMailController } from '../controllers/SendForgotPasswordMailController';
import { ProfileUserController } from '../controllers/ProfileUserController';

const accountsRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUsersControllers();
const updateUserAvatarController = new UpdateUserAvatarController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();
const profileUserController = new ProfileUserController();

accountsRoutes.post('/', createUserController.handle);

accountsRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

accountsRoutes.get(
  '/profile',
  ensureAuthenticated,
  profileUserController.handle,
);

accountsRoutes.post(
  '/forgot_password',
  sendForgotPasswordMailController.handle,
);

accountsRoutes.post('/reset_password', resetPasswordUserController.handle);

export { accountsRoutes };
