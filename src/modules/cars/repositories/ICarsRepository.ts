import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

export interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAllAvailable({ category_id, brand, name }: IRequest): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  create(data: ICreateCarDTO): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
