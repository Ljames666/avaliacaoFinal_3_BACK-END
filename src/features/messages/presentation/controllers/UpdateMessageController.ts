import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { UpdateMessageService } from "../../domain/services/UpdateMessageService";

export class UpdateMessageController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const { description, details } = req.body;
      const service = new UpdateMessageService();
      const serviceExecute = await service.execute({ id, description, details });
      return res.json({ serviceExecute, message: " message modified successfully" });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
