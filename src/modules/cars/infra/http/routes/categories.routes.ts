import { Router } from 'express';
import multer from 'multer';

import {
  createCategoriesController,
  listCategoriesController,
  importCategoryController,
} from '../controllers/categories';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (req, res) => {
  return createCategoriesController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
