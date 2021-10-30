import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

export interface IUsersTokensRepository {
  create({
    user_id,
    expires_in,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAnRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}
