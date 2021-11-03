export interface IUserResponseDTO {
  id: string;
  email: string;
  name: string;
  avatar: string;
  driverLicense: string;
  isAdmin: boolean;
  avatar_url(): string;
}
