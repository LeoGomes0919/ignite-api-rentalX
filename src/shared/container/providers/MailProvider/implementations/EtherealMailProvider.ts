import { injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import { IMailProvider, IMailVariables } from '../IMailProvider';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.error(err));
  }

  sendMail(
    to: string,
    subject: string,
    variables: IMailVariables,
    path: string,
  ): void {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    this.client.sendMail(
      {
        to,
        from: 'Rentx <noreplay@rentx.com.br>',
        subject,
        html: templateHTML,
      },
      (err, info) => {
        if (err) {
          console.error(`Error occured sending. ${err.message}`);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      },
    );
  }
}
