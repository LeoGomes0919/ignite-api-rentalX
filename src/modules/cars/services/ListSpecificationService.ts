import { Specification } from '../model/Specification';
import { ISpecificationsRepository } from '../repositories/implementations/ISpecificationsRepository';

export class ListSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}
