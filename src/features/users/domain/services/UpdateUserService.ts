import { IService } from "../../../../core/domain/interface/IService";
import { UserRepository } from "../../infra/repository/UserRepository";
import { IUser } from "../interface/IUser";

export class UpdateUserService implements IService {
  constructor(private repository: UserRepository) {}
  async execute({ id, name, username, email, password }: IUser) {
    try {
      const user = await this.repository.findOne(id);

      if (!user) {
        throw new Error(`user does not exist`);
      }
      const ThisUser = await this.repository.upDate(user, { name, username, email, password });

      return ThisUser;
    } catch (error) {
      throw error;
    }
  }
}
