import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

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

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
    return allSpecifications;
  }
}
