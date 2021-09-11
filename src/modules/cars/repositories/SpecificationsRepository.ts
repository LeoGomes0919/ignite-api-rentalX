import { Specification } from '../model/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from './implementations/ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specifications.push(specification);
    return specification;
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification {
    const checkSpecificationIfExists = this.specifications.find(
      specification => specification.name === name,
    );

    return checkSpecificationIfExists;
  }
}
