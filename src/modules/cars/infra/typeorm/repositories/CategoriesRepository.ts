import { getRepository, Repository } from 'typeorm';
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '../entities/Category';

export class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.ormRepository.create({ name, description });
    await this.ormRepository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const checkCategoryIfExist = await this.ormRepository.findOne({ name });
    return checkCategoryIfExist;
  }
}
