import { ListRentalByUserService } from '@modules/rentals/services/ListRentalByUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListRentalByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listRentalByUserService = container.resolve(ListRentalByUserService);

    const rentals = await listRentalByUserService.execute({
      user_id: id,
    });

    return res.status(200).json(rentals);
  }
}
