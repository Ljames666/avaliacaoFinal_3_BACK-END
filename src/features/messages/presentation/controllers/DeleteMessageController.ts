import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { DeleteMessageService } from "../../domain/services/DeleteMessageService";

export class DeleteMessageController implements Controller {
  constructor(private service: DeleteMessageService) {}
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      await this.service.execute(id);
      return res.status(200).end("deleted!");
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
