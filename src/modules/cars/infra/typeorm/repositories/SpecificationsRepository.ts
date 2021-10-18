import { getRepository, Repository } from 'typeorm';
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

export class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.ormRepository.create({ name, description });
    await this.ormRepository.save(specification);
    return specification;
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

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = await this.ormRepository.findByIds(ids);
    return allSpecifications;
  }
}
