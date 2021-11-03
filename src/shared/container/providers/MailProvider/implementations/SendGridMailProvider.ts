import sgMail from '@sendgrid/mail';
import fs from 'fs';
import handlebars from 'handlebars';
import { IMailProvider, IMailVariables } from '../IMailProvider';

export class SendGridMailProvider implements IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: IMailVariables,
    path: string,
  ): void {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    sgMail
      .send({
        to,
        from: 'Rentx <leoac1922@gmail.com>',
        subject,
        html: templateHTML,
      })
      .then(response => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
