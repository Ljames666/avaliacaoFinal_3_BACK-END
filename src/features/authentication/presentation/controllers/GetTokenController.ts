import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { GetTokenService } from "../../domain/services/GetTokenService";

export class GetTokenController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const service = new GetTokenService();
      const result = await service.execute(id);

      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  }
}
