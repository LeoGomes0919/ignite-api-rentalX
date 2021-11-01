import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
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

  if (!authorization) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authorization.split(' ');
  try {
    const { sub: user_id } = verify(token, auth.jwt.secret) as IPayload;

    req.user = {
      id: user_id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
