import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers;

  const userTokenRepository = new UsersTokensRepository();

  if (!authorization) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authorization.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      auth.jwt.secretRefreshToken,
    ) as IPayload;

    const user = await userTokenRepository.findByUserIdAnRefreshToken(
      user_id,
      token,
    );

    if (!user) {
      throw new AppError('User does not exists', 404);
    }
    req.user = {
      id: user.user_id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
