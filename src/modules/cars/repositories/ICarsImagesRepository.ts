import { CarImage } from '../infra/typeorm/entities/CarImage';

interface IRequest {
  car_id: string;
  image: string;
}

export interface ICarsImagesRepository {
  create({ car_id, image }: IRequest): Promise<CarImage>;
}
