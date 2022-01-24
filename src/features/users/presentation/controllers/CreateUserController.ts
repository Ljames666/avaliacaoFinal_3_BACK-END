import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { CreateUserService } from "../../domain/services/CreateUserService";

export class CreateUserController implements Controller {
  async handle(req: Request, res: Response) {
    try {
      const { name, username, email, password, reppeatPassword } = req.body;
      const service = new CreateUserService();

      const newService = await service.execute({
        name,
        username,
        email,
        password,
        reppeatPassword,
      });
      console.log(newService);

      return res.json(newService);
    } catch (error) {
      return res.send(error);
    }
  }
}
