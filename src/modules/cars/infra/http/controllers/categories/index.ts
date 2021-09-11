import { CategoriesRepository } from '../../../../repositories/CategoriesRepository';
import { CreateCategoryService } from '../../../../services/CreateCategoryService';
import { ImportCategoryService } from '../../../../services/ImportCategoryService';
import { ListCategoryService } from '../../../../services/ListCategoryService';
import { CreateCategoriesController } from './CreateCategoriesController';
import { ImportCategoryController } from './ImportCategoryController';
import { ListCategoriesController } from './ListCategoriesController';

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryService = new CreateCategoryService(categoriesRepository);
const listCategoryService = new ListCategoryService(categoriesRepository);
const importCategoryService = new ImportCategoryService();

const importCategoryController = new ImportCategoryController(
  importCategoryService,
);
const createCategoriesController = new CreateCategoriesController(
  createCategoryService,
);
const listCategoriesController = new ListCategoriesController(
  listCategoryService,
);

export {
  createCategoriesController,
  listCategoriesController,
  importCategoryController,
};
