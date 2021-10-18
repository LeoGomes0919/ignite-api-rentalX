import { CreateCarSpecificationService } from '@modules/cars/services/CreateCarSpecificationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCarsSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationService = container.resolve(
      CreateCarSpecificationService,
    );

    const cars = await createCarSpecificationService.execute({
      car_id: id,
      specifications_id,
    });

    return res.status(200).json(cars);
  }
}
