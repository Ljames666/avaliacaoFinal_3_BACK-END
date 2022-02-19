import { Request, Response } from 'express';
import { Controller } from '../../../../core/infra/contracts/Controller';
import { GetMessageByIdService } from '../../domain/services/GetMessagesServices';

// export class GetMessagesController implements Controller {
//   constructor(private service: GetMessagesService) {}
//   async handle(req: Request, res: Response) {
//     try {
//       const serviceGet = await this.service.execute();
//       return res.status(200).json(serviceGet);
//     } catch (error) {
//       return res.status(400).send(error);
//     }
//   }
// }

export class GetMessageByIdController implements Controller {
  constructor(private service: GetMessageByIdService) {}
  async handle(req: Request, res: Response) {
    try {
      const user_id = req.params.userId;

      const serviceGetById = await this.service.execute(user_id);
      return res.status(200).json(serviceGetById);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
