import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../implementations/ICategoriesRepository';

export class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const findCategory = this.categories.find(
      category => category.name === name,
    );

    return findCategory;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }
}
