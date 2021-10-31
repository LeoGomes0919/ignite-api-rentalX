import { SendForgotPasswordMailService } from '@modules/accounts/services/SendForgotPasswordMailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordMailService = container.resolve(
      SendForgotPasswordMailService,
    );

    sendForgotPasswordMailService.execute({ email });

    return res.send();
  }
}
