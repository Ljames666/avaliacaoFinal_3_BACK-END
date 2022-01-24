import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import {
  GetMessageByIdService,
  GetMessagesService,
} from "../../domain/services/GetMessagesServices";

export class GetMessagesController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const service = new GetMessagesService();
      const serviceGet = await service.execute();
      return res.status(200).json(serviceGet);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export class GetMessageByIdController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const user_id = req.params.userId;
      const service = new GetMessageByIdService();
      const serviceGetById = await service.execute(user_id);
      return res.status(200).json(serviceGetById);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
