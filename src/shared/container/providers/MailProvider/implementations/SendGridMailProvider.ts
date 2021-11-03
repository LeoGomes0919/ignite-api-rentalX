import { IMailProvider, IMailVariables } from '../IMailProvider';

export class SendGridMailProvider implements IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: IMailVariables,
    path: string,
  ): void {}
}
