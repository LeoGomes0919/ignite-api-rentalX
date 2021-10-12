import { AppError } from '../shared/errors/AppError';
import { CreateUserService } from '../modules/accounts/services/CreateUserService';
import { FakeUsersRepository } from '../modules/accounts/repositories/fakes/FakeUsersRepository';
import { AuthenticateUserService } from '../modules/accounts/services/AuthenticateUserService';
import { ICreateUserDTO } from '../modules/accounts/dtos/ICreateUserDTO';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository);
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
  });

  it('should be able a create authentication', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0000',
      email: 'leogs@gmail.com',
      password: '1234',
      name: 'Jhon Doe',
    };
    await createUserService.execute(user);

    const auth = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });
    expect(auth).toHaveProperty('token');
  });

  it('should not be able to authenticatean noneexistent user', async () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: 'jhondoe@gmail.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate if password is incorrect', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '0000',
        email: 'leogs@gmail.com',
        password: '1234',
        name: 'Jhon Doe',
      };
      await createUserService.execute(user);

      await authenticateUserService.execute({
        email: user.email,
        password: '12345',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
