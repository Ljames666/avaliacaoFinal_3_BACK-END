import { Request, Response } from "express";
import {
  CreateMessagesService,
  DeleteMessagesService,
  GetByUserIdMessageService,
  GetMessagesService,
  UpdateMessagesService,
} from "../services/MessagesService";

export class CreateMessagesController {
  async handle(request: Request, response: Response) {
    const user_id = request.params.userId;
    const { description, details } = request.body;

    const service = new CreateMessagesService();

    const result = await service.execute({ description, details, user_id });

    if (result instanceof Error) {
      console.log(result.message);

      return response.status(400).send({ message: result.message });
    }

    return response.json({ result, message: "message created successfully" });
  }
}

export class GetMessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetMessagesService();

    const Messages = await service.execute();

    return response.json(Messages);
  }
}
export class GetByUserIdMessageController {
  async handle(request: Request, response: Response) {
    const user_id = request.params.userId;
    const service = new GetByUserIdMessageService();

    const messages = await service.execute(user_id);

    return response.json(messages);
  }
}

export class UpdateMessagesController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;

    const { description, details } = request.body;

    const service = new UpdateMessagesService();

    const result = await service.execute({ id, description, details });

    if (result instanceof Error) {
      return response.status(400).send({ message: result.message });
    }
    return response.json({ result, message: " message modified successfully" });
  }
}

export class DeleteMessagesController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;
    const service = new DeleteMessagesService();

    const result = await service.execute(id);

    if (result instanceof Error) {
      return response.status(404).send({ message: result.message });
    }

    return response.status(204).end();
  }
}
