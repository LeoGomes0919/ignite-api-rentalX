import { inject, injectable } from 'tsyringe';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

dayjs.extend(utc);

@injectable()
export class CreateRentalService {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
    rent_amount,
  }: ICreateRentalDTO): Promise<Rental> {
    const minHoursRental = 24;

    const carUnavailable = await this.rentalsRepository.findByCarRental(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const userOpenToRental = await this.rentalsRepository.findByUserRental(
      user_id,
    );

    if (userOpenToRental) {
      throw new AppError('There`s a rental in progress for user');
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare < minHoursRental) {
      throw new AppError(
        'Minimum turnaround time cannot be less than 24 hours',
      );
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
      rent_amount,
    });

    return rental;
  }
}
