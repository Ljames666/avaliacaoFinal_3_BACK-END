import { IService } from "../../../../core/domain/interface/IService";
import { UserRepository } from "../../infra/repository/UserRepository";

export class DeleteUserService implements IService {
  async execute(id: string) {
    try {
      const repository = new UserRepository();
      const user = await repository.delete(id);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
