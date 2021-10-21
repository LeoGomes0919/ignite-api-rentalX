import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

export interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
    rent_amount,
  }: ICreateRentalDTO): Promise<Rental>;
  findByCarRental(car_id: string): Promise<Rental>;
  findByUserRental(user_id: string): Promise<Rental>;
}
