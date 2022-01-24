import { IService } from "../../../../core/domain/interface/IService";
import { UserRepository } from "../../infra/repository/UserRepository";

export class GetUsersService implements IService {
  async execute() {
    try {
      const repository = new UserRepository();
      const users = await repository.getAll();

      if (!users) throw new Error("No users");

      return users;
    } catch (error) {
      throw error;
    }
  }
}
export class GetUserByIdService implements IService {
  async execute(id: string) {
    try {
      const repository = new UserRepository();
      const user = await repository.getById(id);

      if (!user) throw new Error("No user");

      return user;
    } catch (error) {
      throw error;
    }
  }
}
