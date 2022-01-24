import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";

import { UpdateUserService } from "../../domain/services/UpdateUserService";

export class UpdateUserController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { name, username, email, password } = req.body;
      const updateService = new UpdateUserService();
      const service = await updateService.execute({ id, name, username, email, password });
      return res.send(service);
    } catch (error) {
      return res.send(error);
    }
  }
}
