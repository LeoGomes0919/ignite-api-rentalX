import { ISpecificationsRepository } from '../repositories/implementations/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): IRequest {
    const specificationAlreadExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadExists) {
      throw new Error('Specification Already exists!');
    }
    const specification = this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
