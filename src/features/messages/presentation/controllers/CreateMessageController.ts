import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { CreateMessageService } from "../../domain/services/CreateMessageService";

export class CreateMessageController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const user_id = req.params.userId as string;

      const { description, details } = req.body;
      const service = new CreateMessageService();
      const newService = await service.execute({ description, details, user_id });

      return res.status(200).json(newService);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
}
