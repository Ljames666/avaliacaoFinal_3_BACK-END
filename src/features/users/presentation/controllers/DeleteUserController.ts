import { Request, Response } from 'express';
import { Controller } from '../../../../core/infra/contracts/Controller';

import { DeleteUserService } from '../../domain/services/DeleteUserService';

export class DeleteUserController implements Controller {
  constructor(private service: DeleteUserService) {}
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const deleteService = await this.service.execute(id);
      return res.status(200).send(deleteService);
    } catch (error) {
      return res.send(error);
    }
  }
}
