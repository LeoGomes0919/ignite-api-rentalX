import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';
import { Car } from '../entities/Car';

interface IRequest {
  category_id: string;
  brand: string;
  name: string;
}

export class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  findById(car_id: string): Promise<Car> {
    const car = this.ormRepository.findOneOrFail({ id: car_id });
    return car;
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });
    await this.ormRepository.save(car);
    return car;
  }

  async findAllAvailable({
    category_id,
    brand,
    name,
  }: IRequest): Promise<Car[]> {
    const carsQuery = this.ormRepository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }
    const cars = await carsQuery.getMany();

    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const checkLicensePlatIfExist = await this.ormRepository.findOne({
      license_plate,
    });
    return checkLicensePlatIfExist;
  }
}
