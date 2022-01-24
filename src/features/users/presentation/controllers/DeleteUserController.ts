import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";

import { DeleteUserService } from "../../domain/services/DeleteUserService";

export class DeleteUserController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const service = new DeleteUserService();
      const deleteService = await service.execute(id);
      return res.send(deleteService);
    } catch (error) {
      return res.send(error);
    }
  }
}
