import { AppError } from '@shared/errors/AppError';
import { FakeCategoriesRepository } from '@modules/cars/repositories/fakes/FakeCategoriesRepository';
import { CreateCategoryService } from '@modules/cars/services/CreateCategoryService';

let createCategoryService: CreateCategoryService;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe('Create Category', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(fakeCategoriesRepository);
  });

  it('should able a create new Category', async () => {
    const category = {
      name: 'Testando',
      description: 'Testando descrição',
    };

    await createCategoryService.execute(category);

    const categoryCreated = await fakeCategoriesRepository.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new cate with same name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Testando',
        description: 'Testando descrição',
      };

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
