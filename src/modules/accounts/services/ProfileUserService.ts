import { inject, injectable } from 'tsyringe';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { UserMap } from '../mapper/UserMap';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class ProfileUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);
    return UserMap.toDTO(user);
  }
}
