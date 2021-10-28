import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

export class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const findExistsCarWithLicensePlat = this.cars.find(
      car => car.license_plate === license_plate,
    );
    return findExistsCarWithLicensePlat;
  }

  async create({
    id,
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);
    return car;
  }

  async findAllAvailable({
    category_id,
    brand,
    name,
  }: IRequest): Promise<Car[]> {
    const cars = this.cars.filter(car => {
      if (
        car.available === true ||
        (category_id && car.category_id === category_id) ||
        (brand && car.brand === brand) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return [];
    });
    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const findCar = this.cars.find(car => car.id === car_id);
    return findCar;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars[carIndex].available = available;
  }
}
