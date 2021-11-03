import { container } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SendGridMailProvider } from './implementations/SendGridMailProvider';

const mailProvider = {
  etheral: container.resolve(EtherealMailProvider),
  sendGrid: container.resolve(SendGridMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
