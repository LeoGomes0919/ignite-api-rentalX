export interface ICreateUserTokenDTO {
  user_id: string;
  expires_in: Date;
  refresh_token: string;
}
