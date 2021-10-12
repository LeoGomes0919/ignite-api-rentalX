import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoryService } from '@modules/cars/services/ListCategoryService';

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoryService = container.resolve(ListCategoryService);

    const categories = await listCategoryService.execute();
    return res.status(200).json({ categories });
  }
}
