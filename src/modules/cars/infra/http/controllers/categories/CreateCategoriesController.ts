import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryService } from '@modules/cars/services/CreateCategoryService';

export class CreateCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    await createCategoryService.execute({
      name,
      description,
    });

    return res.status(201).send();
  }
}
