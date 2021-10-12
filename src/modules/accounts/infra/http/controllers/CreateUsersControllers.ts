import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '@modules/accounts/services/CreateUserService';

export class CreateUsersControllers {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password, email, driver_license } = req.body;

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      name,
      password,
      email,
      driver_license,
    });

    return res.status(201).send();
  }
}
