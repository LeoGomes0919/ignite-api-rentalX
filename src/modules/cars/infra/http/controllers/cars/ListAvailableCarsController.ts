import { ListAvailableCarService } from '@modules/cars/services/ListAvailableCarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { category_id, brand, name } = req.query;

    const listAvailableCarService = container.resolve(ListAvailableCarService);

    const cars = await listAvailableCarService.execute({
      category_id: category_id as string,
      brand: brand as string,
      name: name as string,
    });
    return res.status(200).json({ cars });
  }
}
