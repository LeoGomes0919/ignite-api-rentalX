import { inject, injectable } from 'tsyringe';
import { Specification } from '../entities/Specification';
import { ISpecificationsRepository } from '../repositories/implementations/ISpecificationsRepository';

@injectable()
export class ListSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();

    return specifications;
  }
}
