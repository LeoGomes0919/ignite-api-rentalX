import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { RefreshTokenController } from '../controllers/RefreshTokenController';

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post('/', authenticateUserController.handle);
authRoutes.post('/refresh_token', refreshTokenController.handle);

export { authRoutes };
