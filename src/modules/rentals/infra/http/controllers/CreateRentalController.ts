import { CreateRentalService } from '@modules/rentals/services/CreateRentalService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expected_return_date, rent_amount } = req.body;
    const { id } = req.user;
    const createRentalService = container.resolve(CreateRentalService);

    const rental = await createRentalService.execute({
      car_id,
      user_id: id,
      rent_amount,
      expected_return_date,
    });

    return res.status(201).json(rental);
  }
}
