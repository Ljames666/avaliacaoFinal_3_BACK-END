import { IService } from "../../../../core/domain/interface/IService";
import { UserRepository } from "../../infra/repository/UserRepository";

export class GetUsersService implements IService {
  constructor(private repository: UserRepository) {}
  async execute() {
    try {
      const users = await this.repository.getAll();

      if (!users) throw new Error("No users");

      return users;
    } catch (error) {
      throw error;
    }
  }
}
export class GetUserByIdService implements IService {
  constructor(private repository: UserRepository) {}
  async execute(id: string) {
    try {
      const user = await this.repository.getById(id);

      if (!user) throw new Error("No user");

      return user;
    } catch (error) {
      throw error;
    }
  }
}
