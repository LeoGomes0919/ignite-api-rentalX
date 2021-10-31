import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { resolve } from 'path';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export class SendForgotPasswordMailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'accounts',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    if (!user) {
      throw new AppError('User does not expiresRefreshTokenDays');
    }

    const token = uuid();
    const expires_hours = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_in: expires_hours,
    });

    const variables = {
      name: user.name,
      link: `${process.env.LINK_FORGOT_MAIL_URL}${token}`,
    };

    this.etherealMailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    );
  }
}
