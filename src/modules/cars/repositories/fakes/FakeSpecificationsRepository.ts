import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../implementations/ISpecificationsRepository';

export class FakeSpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    const findSpecification = await this.specifications.find(
      spec => spec.name === name,
    );

    return findSpecification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);
  }
}
