import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { GetUserByIdService, GetUsersService } from "../../domain/services/GetUserServices";

export class GetUsersController implements Controller {
  constructor(private service: GetUsersService) {}
  async handle(req: Request, res: Response) {
    try {
      const getService = await this.service.execute();
      return res.send(getService);
    } catch (error) {
      return res.send(error);
    }
  }
}
export class GetUserByIdController implements Controller {
  constructor(private service: GetUserByIdService) {}
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const serviceResult = await this.service.execute(id);
      return res.send(serviceResult);
    } catch (error) {
      return res.send(error);
    }
  }
}
