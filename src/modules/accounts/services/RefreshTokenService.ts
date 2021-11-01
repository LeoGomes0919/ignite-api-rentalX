import { inject, injectable } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';
import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

interface IRequest {
  token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token }: IRequest): Promise<ITokenResponse> {
    const { sub, email } = verify(
      token,
      auth.jwt.secretRefreshToken,
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAnRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.jwt.secretRefreshToken, {
      subject: sub,
      expiresIn: auth.jwt.expiresInRefreshToken,
    });

    const expires_in = this.dateProvider.addDays(
      auth.jwt.expiresRefreshTokenDays,
    );

    await this.usersTokensRepository.create({
      expires_in,
      refresh_token,
      user_id,
    });

    const new_token = sign({}, auth.jwt.secret, {
      subject: user_id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      token: new_token,
      refresh_token,
    };
  }
}
