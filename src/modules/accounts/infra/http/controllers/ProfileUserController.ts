import { ProfileUserService } from '@modules/accounts/services/ProfileUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const profileUserService = container.resolve(ProfileUserService);

    const user = await profileUserService.execute(id);

    return res.json(user);
  }
}
