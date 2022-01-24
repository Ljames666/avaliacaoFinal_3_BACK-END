import { IService } from "../../../../core/domain/interface/IService";
import { TableUsers } from "../../../../core/infra/database/models/TableUsers";
import { UserRepository } from "../../infra/repository/UserRepository";
import { UserCreateRequest } from "../interface/UserCreateRequest";

export class CreateUserService implements IService {
  async execute({ name, username, email, password, reppeatPassword }: UserCreateRequest) {
    try {
      const repository = new UserRepository();
      console.log(repository);

      if (password !== reppeatPassword) {
        throw new Error(`Passwords don't match!`);
      }

      if (await repository.findOne({ name })) {
        throw new Error(`User already exists, please choose another one!`);
      }

      const user = await repository.create({ name, username, email, password });
      console.log(user);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
