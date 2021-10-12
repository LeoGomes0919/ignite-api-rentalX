import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, { name, password, email, driver_license });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findByDriverLicense(driverLicense: string): Promise<User> {
    return this.users.find(user => user.driverLicense === driverLicense);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}
