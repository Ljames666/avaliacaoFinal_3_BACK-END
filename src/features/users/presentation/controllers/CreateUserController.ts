import { Request, Response } from "express";
import { Controller } from "../../../../core/infra/contracts/Controller";
import { CreateUserService } from "../../domain/services/CreateUserService";

export class CreateUserController implements Controller {
  constructor(private service: CreateUserService) {}
  async handle(req: Request, res: Response) {
    try {
      const { name, username, email, password, reppeatPassword } = req.body;

      const newService = await this.service.execute({
        name,
        username,
        email,
        password,
        reppeatPassword,
      });

      return res.json(newService);
    } catch (error) {
      return res.send(error);
    }
  }
}
