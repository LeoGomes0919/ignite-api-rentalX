import { getRepository, Repository } from 'typeorm';
import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../entities/Specification';
import { ISpecificationsRepository } from './implementations/ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.ormRepository.create({ name, description });
    await this.ormRepository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.ormRepository.find();
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const checkSpecificationIfExists = await this.ormRepository.findOne({
      name,
    });
    return checkSpecificationIfExists;
  }
}
