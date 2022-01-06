import { Request, Response } from "express";

import { CreateTokenService, DeleteTokenService, GetTokenService } from "../services/TokenService";

export class CreateTokenByLoginController {
  async handle(request: Request, response: Response) {
    const { _username, _password } = request.body;

    const service = new CreateTokenService();

    const result = await service.execute({ _username, _password });

    return response.json({ result });
  }
}

export class GetTokenController {
  async handle(request: Request, response: Response) {
    const user_id = request.params.uId;

    const service = new GetTokenService();

    const result = await service.execute(user_id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({ result });
  }
}

export class DeleteTokenByLoginController {
  async handle(request: Request, response: Response) {
    const { token } = request.params;
    const service = new DeleteTokenService();

    const result = await service.execute(token);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}
