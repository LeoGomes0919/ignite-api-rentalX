import { CreateCarService } from '@modules/cars/services/CreateCarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCarsCrontoller {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = req.body;

    const createCarsService = container.resolve(CreateCarService);

    const car = await createCarsService.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return res.status(201).json(car);
  }
}
