import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { injectable, inject } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

interface IRequest {
  rental_id: string;
}

@injectable()
export class DevolutionRentalService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ rental_id }: IRequest): Promise<Rental> {
    const minimum_daily = 1;
    const rental = await this.rentalsRepository.findById(rental_id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError('Rental does not exist');
    }

    const dateNow = this.dateProvider.dateNow();
    const lateReturn = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let daily = this.dateProvider.compareInDays(dateNow, rental.start_date);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    let total = 0;
    let calculate_fine = 0;
    if (lateReturn > 0) {
      calculate_fine = lateReturn * car.fine_amount;
      total = calculate_fine;
    }
    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;
    rental.late_fee = calculate_fine;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }
}
