import { Request, Response } from 'express';
import { Controller } from '../../../../core/infra/contracts/Controller';
import { GetTokenService } from '../../domain/services/GetTokenService';

export class GetTokenController implements Controller {
  constructor(private service: GetTokenService) {}
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const result = await this.service.execute(id);

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) return res.status(404).send({ message: error.message });
    }
  }
}
