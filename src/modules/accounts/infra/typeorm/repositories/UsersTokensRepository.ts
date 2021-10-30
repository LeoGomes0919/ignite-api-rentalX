import { getRepository, Repository } from 'typeorm';
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UserToken } from '../entities/UserToken';

export class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByUserIdAnRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const userTokens = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });

    return userTokens;
  }

  async create({
    user_id,
    expires_in,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
      expires_in,
      refresh_token,
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }
}
