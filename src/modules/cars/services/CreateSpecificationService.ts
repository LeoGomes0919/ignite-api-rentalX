import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from '../repositories/implementations/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadExists) {
      throw new Error('Specification Already exists!');
    }
    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}
