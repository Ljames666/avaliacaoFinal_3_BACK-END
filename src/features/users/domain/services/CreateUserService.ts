import { IService } from "../../../../core/domain/interface/IService";

import { UserRepository } from "../../infra/repository/UserRepository";
import { UserCreateRequest } from "../interface/UserCreateRequest";

export class CreateUserService implements IService {
  constructor(private repository: UserRepository) {}
  async execute({ name, username, email, password, reppeatPassword }: UserCreateRequest) {
    try {
      if (password !== reppeatPassword) {
        throw new Error(`Passwords don't match!`);
      }

      if (await this.repository.findOne({ name })) {
        throw new Error(`User already exists, please choose another one!`);
      }

      const user = await this.repository.create({ name, username, email, password });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
