import { Request, Response } from "express";
import {
  CreateUsersService,
  DeleteUsersService,
  GetByIdUsersService,
  GetUsersService,
  UpdateUsersService,
} from "../services/UsersService";

export class CreateUsersController {
  async handle(request: Request, response: Response) {
    const { name, username, email, password } = request.body;

    const service = new CreateUsersService();

    const result = await service.execute({ name, username, email, password });
    console.log(result);

    if (result instanceof Error) {
      return response.status(400).send({ message: result.message });
    }

    return response.json({ result });
  }
}

export class GetUsersController {
  async handle(request: Request, response: Response) {
    const service = new GetUsersService();

    const users = await service.execute();

    return response.json(users);
  }
}
export class GetByIdUsersController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;
    const service = new GetByIdUsersService();

    const users = await service.execute(id);

    return response.json(users);
  }
}

export class UpdateUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const { name, username, email, password } = request.body;

    const service = new UpdateUsersService();

    const result = await service.execute({ id, name, username, email, password });

    if (result instanceof Error) {
      return response.status(400).send({ message: result.message });
    }
    return response.json(result);
  }
}

export class DeleteUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const service = new DeleteUsersService();

    const result = await service.execute(id);

    if (result instanceof Error) {
      return response.status(404).send({ message: result.message });
    }

    return response.status(204).end();
  }
}
