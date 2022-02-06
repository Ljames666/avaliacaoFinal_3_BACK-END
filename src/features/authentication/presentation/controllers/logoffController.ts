import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { LogoffService } from "../../domain/services/LogoffService";

export class LogoffController implements Controller {
  constructor(private service: LogoffService) {}
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const logoff = await this.service.execute(id);

      return res.send(logoff);
    } catch (error) {
      return res.send(error);
    }
  }
}
