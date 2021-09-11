import { Request, Response } from 'express';
import { ListSpecificationService } from '../../../../services/ListSpecificationService';

export class ListSpecificationsController {
  constructor(private listSpecificationService: ListSpecificationService) {}

  handle(req: Request, res: Response): Response {
    const specifications = this.listSpecificationService.execute();
    return res.status(200).json({ specifications });
  }
}
