import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { getRepository, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    rent_amount,
    id,
    end_date,
    late_fee,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      expected_return_date,
      rent_amount,
      id,
      end_date,
      late_fee,
      total,
    });
    await this.ormRepository.save(rental);
    return rental;
  }

  async findByCarRental(car_id: string): Promise<Rental> {
    const carRentalUnavaliable = await this.ormRepository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
    return carRentalUnavaliable;
  }

  async findByUserRental(user_id: string): Promise<Rental> {
    const userRental = await this.ormRepository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
    return userRental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.ormRepository.findOne(id);
    return rental;
  }

  async rentalsByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.ormRepository.find({
      where: { user_id },
      relations: ['car'],
    });
    return rentals;
  }
}
