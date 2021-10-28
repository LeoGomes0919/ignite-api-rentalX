import { inject, injectable } from 'tsyringe';
import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export class ListRentalByUserService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.rentalsByUser(user_id);
    return rentals;
  }
}
