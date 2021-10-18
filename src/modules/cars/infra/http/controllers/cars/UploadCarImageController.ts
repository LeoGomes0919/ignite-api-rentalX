import { UploadCarImageSerivce } from '@modules/cars/services/UploadCarImageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

interface IFiles {
  filename: string;
}

export class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id } = req.params;
    const images_file = req.files as IFiles[];

    const uploadCarImageService = container.resolve(UploadCarImageSerivce);

    const fileNames = images_file.map(file => file.filename);

    await uploadCarImageService.execute({
      car_id,
      images: fileNames,
    });

    return res.status(201).send();
  }
}
