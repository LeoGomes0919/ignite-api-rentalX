import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authorization.split(' ');
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 404);
    }
    req.user = {
      id: user.id,
      name: user.name,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token');
  }
}
