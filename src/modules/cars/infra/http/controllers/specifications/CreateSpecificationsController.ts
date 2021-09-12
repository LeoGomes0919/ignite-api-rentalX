import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationService } from '../../../../services/CreateSpecificationService';

export class CreateSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationService = container.resolve(
      CreateSpecificationService,
    );
    await createSpecificationService.execute({
      name,
      description,
    });

    return res.status(201).send();
  }
}
