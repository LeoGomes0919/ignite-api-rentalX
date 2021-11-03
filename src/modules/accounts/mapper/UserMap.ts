import { classToClass } from 'class-transformer';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

export class UserMap {
  static toDTO({
    id,
    email,
    name,
    avatar,
    driverLicense,
    isAdmin,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      email,
      name,
      avatar,
      driverLicense,
      isAdmin,
      avatar_url,
    });
    return user;
  }
}
