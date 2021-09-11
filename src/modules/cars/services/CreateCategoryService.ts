import { ICategoriesRepository } from '../repositories/implementations/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): IRequest {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category Already exists!');
    }

    const category = this.categoriesRepository.create({ name, description });
    return category;
  }
}
