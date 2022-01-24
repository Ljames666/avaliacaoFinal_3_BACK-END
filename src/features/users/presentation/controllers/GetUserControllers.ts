import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { GetUserByIdService, GetUsersService } from "../../domain/services/GetUserServices";

export class GetUsersController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const service = new GetUsersService();
      const getService = await service.execute();
      return res.send(getService);
    } catch (error) {
      return res.send(error);
    }
  }
}
export class GetUserByIdController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const service = new GetUserByIdService();
      const serviceResult = await service.execute(id);
      return res.send(serviceResult);
    } catch (error) {
      return res.send(error);
    }
  }
}
