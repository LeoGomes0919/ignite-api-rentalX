import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICarsImagesRepository } from '../repositories/ICarsImagesRepository';
import { ICarsRepository } from '../repositories/ICarsRepository';

interface IRequest {
  car_id: string;
  images: string[];
}

@injectable()
export class UploadCarImageSerivce {
  constructor(
    @inject('CarsImagesRepositoy')
    private carsImagesRepositoy: ICarsImagesRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id, images }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exist', 404);
    }
    images.map(async image => {
      await this.carsImagesRepositoy.create({ car_id, image });
    });
  }
}
