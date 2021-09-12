import { Router } from 'express';
import multer from 'multer';
import { CreateCategoriesController } from '../controllers/categories/CreateCategoriesController';
import { ImportCategoryController } from '../controllers/categories/ImportCategoryController';
import { ListCategoriesController } from '../controllers/categories/ListCategoriesController';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoriesController();
const listCategoryController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
