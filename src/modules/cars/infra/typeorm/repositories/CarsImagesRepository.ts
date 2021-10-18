import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { getRepository, Repository } from 'typeorm';
import { CarImage } from '../entities/CarImage';

interface IRequest {
  car_id: string;
  image: string;
}

export class CarsImagesRepository implements ICarsImagesRepository {
  private ormRepository: Repository<CarImage>;

  constructor() {
    this.ormRepository = getRepository(CarImage);
  }

  async create({ car_id, image }: IRequest): Promise<CarImage> {
    const carImage = this.ormRepository.create({
      car_id,
      image,
    });
    await this.ormRepository.save(carImage);
    return carImage;
  }
}
