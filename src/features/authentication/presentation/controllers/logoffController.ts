import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { LogoffService } from "../../domain/services/LogoffService";

export class LogoffController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const service = new LogoffService();
      const logoff = await service.execute(id);

      return res.send(logoff);
    } catch (error) {
      return res.send(error);
    }
  }
}
