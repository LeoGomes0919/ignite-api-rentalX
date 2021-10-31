import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.fidByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Token invalid');
    }
    const dateNow = this.dateProvider.dateNow();
    const isExpiresDateBefore = this.dateProvider.compareIfBefore(
      userToken.expires_in,
      dateNow,
    );

    if (isExpiresDateBefore) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    const passwordHashed = await hash(password, 8);
    user.password = passwordHashed;

    await this.usersRepository.create(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
