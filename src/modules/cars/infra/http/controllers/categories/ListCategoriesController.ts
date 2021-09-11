import { Request, Response } from 'express';
import { ListCategoryService } from '../../../../services/ListCategoryService';

export class ListCategoriesController {
  constructor(private listCategoryService: ListCategoryService) {}
  handle(req: Request, res: Response): Response {
    const categories = this.listCategoryService.execute();
    return res.status(200).json({ categories });
  }
}
