import { IService } from "../../../../core/domain/interface/IService";
import { UserRepository } from "../../infra/repository/UserRepository";

export class DeleteUserService implements IService {
  constructor(private repository: UserRepository) {}
  async execute(id: string) {
    try {
      if (!(await this.repository.findOne(id))) throw new Error("User does not exist");
      const user = await this.repository.delete(id);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
