import { RefreshTokenService } from '@modules/accounts/services/RefreshTokenService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.headers['x-access-token'] || req.query.token;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refresh_token = await refreshTokenService.execute({
      token,
    });

    return res.json(refresh_token);
  }
}
