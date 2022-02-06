import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { GetTokenService } from "../../domain/services/GetTokenService";

export class GetTokenController implements Controller {
  constructor(private service: GetTokenService) {}
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const result = await this.service.execute(id);

      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  }
}
