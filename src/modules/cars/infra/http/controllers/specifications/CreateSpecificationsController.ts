import { Request, Response } from 'express';
import { CreateSpecificationService } from '../../../../services/CreateSpecificationService';

export class CreateSpecificationsController {
  constructor(private createSpecificationService: CreateSpecificationService) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const specification = this.createSpecificationService.execute({
      name,
      description,
    });

    return res.status(201).json(specification);
  }
}
