import { Request, Response } from 'express';
import { Controller } from '../../../../core/infra/contracts/Controller';
import { CreateMessageService } from '../../domain/services/CreateMessageService';

export class CreateMessageController implements Controller {
  constructor(private service: CreateMessageService) {}
  async handle(req: Request, res: Response) {
    try {
      const user_id = req.params.userId as string;

      const { description, details } = req.body;

      const newService = await this.service.execute({ description, details, user_id });

      return res.status(200).send({ newService });
    } catch (error) {
      if (error instanceof Error) return res.status(400).send({ message: error.message });
    }
  }
}
