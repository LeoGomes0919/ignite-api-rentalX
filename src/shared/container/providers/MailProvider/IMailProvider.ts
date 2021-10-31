export interface IMailVariables {
  name: string;
  link: string;
}

export interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: IMailVariables,
    path: string,
  ): void;
}
