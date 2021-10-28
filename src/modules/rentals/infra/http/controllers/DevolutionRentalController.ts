import { DevolutionRentalService } from '@modules/rentals/services/DevolutionRentalService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const devolutionRentalService = container.resolve(DevolutionRentalService);

    const rental = await devolutionRentalService.execute({
      rental_id: id,
    });

    return res.status(200).json(rental);
  }
}
