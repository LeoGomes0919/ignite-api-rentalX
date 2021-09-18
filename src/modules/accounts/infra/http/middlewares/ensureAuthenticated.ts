import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../../../repositories/UsersRepository';
import { AppError } from '../../../../../shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authorization.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      'a51234097eb0dea133e4738fcf69f9ed',
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 404);
    }

    return next();
  } catch (err) {
    throw new AppError('Invalid token');
  }
}
