import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCarsCrontoller } from '../controllers/cars/CreateCarsController';
import { CreateCarsSpecificationsController } from '../controllers/cars/CreateCarsSpecificationsController';
import { ListAvailableCarsController } from '../controllers/cars/ListAvailableCarsController';
import { UploadCarImageController } from '../controllers/cars/UploadCarImageController';

const carsRoutes = Router();
const uploadImage = multer(uploadConfig.upload('cars'));

const createCarController = new CreateCarsCrontoller();
const listAvailableCarController = new ListAvailableCarsController();
const createSpecificationCarController =
  new CreateCarsSpecificationsController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationCarController.handle,
);

carsRoutes.post(
  '/images/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImage.array('images'),
  uploadCarImageController.handle,
);

export { carsRoutes };
