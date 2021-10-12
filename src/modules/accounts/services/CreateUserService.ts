import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );
    const userDriverLicenseAlreadyExists =
      await this.usersRepository.findByDriverLicense(driver_license);

    if (userEmailAlreadyExists) {
      throw new AppError('Email address already exists');
    }

    if (userDriverLicenseAlreadyExists) {
      throw new AppError('Driver License already exists');
    }

    const passwordHashed = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHashed,
      email,
      driver_license,
    });
  }
}
