import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSpecificationService } from '../../../../services/ListSpecificationService';

export class ListSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationService = container.resolve(
      ListSpecificationService,
    );
    const specifications = await listSpecificationService.execute();
    return res.status(200).json({ specifications });
  }
}
