import { IService } from "../../../../core/domain/interface/IService";
import { UserRepository } from "../../infra/repository/UserRepository";
import { IUser } from "../interface/IUser";

export class UpdateUserService implements IService {
  async execute({ id, name, username, email, password }: IUser) {
    try {
      const repository = new UserRepository();
      const user = await repository.upDate({ id, name, username, email, password });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
