import { getRepository, Repository } from 'typeorm';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({ email });
    return user;
  }

  async findByDriverLicense(driverLicense: string): Promise<User> {
    const user = await this.ormRepository.findOne({ driverLicense });
    return user;
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.ormRepository.create({
      name,
      password,
      email,
      driverLicense: driver_license,
      avatar,
      id,
    });
    await this.ormRepository.save(user);
  }
}
