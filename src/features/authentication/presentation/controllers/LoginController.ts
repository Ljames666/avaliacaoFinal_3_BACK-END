import { Request, Response } from 'express';
import { Controller } from '../../../../core/infra/contracts/Controller';
import { LoginService } from '../../domain/services/LoginService';

export class LoginController implements Controller {
  constructor(private service: LoginService) {}
  async handle(req: Request, res: Response) {
    try {
      const username = req.body.username as string;
      const password = req.body.password as string;

      const result = await this.service.execute({ username, password });

      return res.status(200).send({ result });
    } catch (error) {
      console.log(error);
    }
  }
}
